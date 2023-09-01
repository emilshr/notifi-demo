import { z } from "zod";
import {
  createTRPCRouter,
  offsetPaginatedPublicProcedure,
  paginatedPublicProcedure,
  protectedProcedure,
} from "../trpc";
import {
  encryptData,
  generateNewTokenSecret,
} from "@/services/sign-hash.service";
import { TRPCError } from "@trpc/server";
import { getRandomBackgroundUrl } from "@/common/background-generator";

const API_TEMPLATE = "NOTIFI-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const PROJECT_COUNT_LIMIT = 3;

export const projectsRouter = createTRPCRouter({
  /**
   * @description Endpoint to get all projects for the requesting user. You can pass the last project id as a cursor to get paginated outputs
   */
  getProjects: paginatedPublicProcedure.query(
    async ({ ctx: { prisma, session }, input: { cursor } }) => {
      const {
        user: { id },
      } = session;
      const items = await prisma.project.findMany({
        where: { userId: id },
        take: 11,
        skip: cursor ? 1 : undefined,
        cursor: cursor ? { id: cursor } : undefined,
      });
      let nextCursor: typeof cursor = undefined;
      if (items.length > 10) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    },
  ),
  /**
   * @description Endpoint to create a project. Every project will be associated with a user entity
   */
  createProject: protectedProcedure
    .input(z.object({ projectName: z.string(), description: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { projectName, description } = input;
      const {
        prisma,
        session: {
          user: { id: userId },
        },
      } = ctx;
      const createdProject = await prisma.project.create({
        data: {
          name: projectName,
          description,
          userId,
          backgroundUrl: getRandomBackgroundUrl(),
        },
      });
      const { id: projectId } = createdProject;
      const projectSecret = generateNewTokenSecret();
      const hashedSecret = encryptData(projectId, projectSecret);
      const { id: projectSecretId } = await prisma.projectSecrets.create({
        data: {
          projectSecret,
          projectId,
        },
      });
      await prisma.projectApiKeys.create({
        data: { projectId, hashedSecret, name: "API Key", projectSecretId },
      });
      return createdProject;
    }),
  /**
   *
   */
  getProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { prisma }, input: { projectId } }) => {
      const foundProject = await prisma.project.findFirst({
        where: { id: projectId },
      });
      return foundProject;
    }),
  updateProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(
      async ({ ctx: { prisma }, input: { projectId, name, description } }) => {
        return await prisma.project.update({
          where: { id: projectId },
          data: { name, description },
        });
      },
    ),
  deleteProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { projectId } }) => {
      return await prisma.project.delete({
        where: { id: projectId },
        include: {
          ProjectApiKeys: true,
          ErrorLogs: true,
          ProjectSecrets: true,
        },
      });
    }),
  getSecretAndApiKeys: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { prisma }, input: { projectId } }) => {
      const foundData = await prisma.projectApiKeys.findMany({
        where: { project: { id: projectId } },
        include: {
          project: {
            include: {
              ProjectSecrets: {
                where: {
                  Project: {
                    id: projectId,
                  },
                },
                select: {
                  projectSecret: true,
                },
              },
            },
          },
        },
      });

      const apiKeys = foundData.map(
        ({ hashedSecret, id, name, createdAt }) => ({
          hashedSecret,
          id,
          name,
          createdAt,
        }),
      );
      if (foundData[0]) {
        const { ProjectSecrets } = foundData[0].project;
        if (ProjectSecrets) {
          return {
            apiKeys,
            projectSecret: {
              secret: `${API_TEMPLATE}${ProjectSecrets.projectSecret.slice(
                ProjectSecrets.projectSecret.length - 4,
                ProjectSecrets.projectSecret.length - 1,
              )}`,
            },
          };
        }
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Requested project not found",
      });
    }),
  createNewApiKey: protectedProcedure
    .input(z.object({ projectId: z.string(), name: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { name, projectId } }) => {
      const foundProjectSecret = await prisma.projectSecrets.findFirst({
        where: { projectId },
      });

      if (!foundProjectSecret) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project not found",
        });
      }
      const { projectSecret } = foundProjectSecret;
      return await prisma.projectApiKeys.create({
        data: {
          hashedSecret: encryptData(projectId, projectSecret),
          name,
          projectId,
          projectSecretId: foundProjectSecret.id,
        },
      });
    }),
  createNewApiKeySecret: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { projectId } }) => {
      const projectSecret = generateNewTokenSecret();

      await prisma.projectSecrets.upsert({
        create: { projectSecret, projectId },
        update: { projectSecret },
        where: { projectId },
      });

      return {
        tokenSecret: `${API_TEMPLATE}${projectSecret.slice(
          projectSecret.length - 4,
          projectSecret.length - 1,
        )}`,
      };
    }),
  getProjectActivityPageCount: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { prisma }, input: { projectId } }) => {
      const count = await prisma.errorLogs.count({ where: { projectId } });
      return Math.ceil(count / 10);
    }),
  getProjectActivities: offsetPaginatedPublicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { prisma }, input: { projectId, skip, take } }) => {
      const items = await prisma.errorLogs.findMany({
        where: { projectId },
        take,
        skip,
      });
      return {
        items,
      };
    }),
  getProjectOverview: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { prisma }, input: { projectId } }) => {
      const [dailyReports, apiConsumption] = await prisma.$transaction([
        prisma.errorLogs.count({
          where: { createdAt: { lte: new Date() }, projectId },
        }),
        prisma.projectApiKeys.count({ where: { projectId } }),
      ]);
      return {
        dailyReports,
        apiConsumption,
      };
    }),
  canUserCreateProjects: protectedProcedure.query(
    async ({
      ctx: {
        prisma,
        session: {
          user: { id },
        },
      },
    }) => {
      const count = await prisma.project.count({ where: { userId: id } });
      return count < PROJECT_COUNT_LIMIT;
    },
  ),
});
