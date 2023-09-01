import { prisma } from "../db";
import { ZodError } from "zod";
import superjson from "superjson";
import { TRPCError, initTRPC } from "@trpc/server";
import { decryptData } from "@/services/sign-hash.service";

interface PackageContext {
  projectApiKey: string | null;
  projectId: string | null;
  host: string;
  userAgent: string;
  origin: string;
}

export const createPackageTRPCContext = (opts: PackageContext) => {
  return {
    prisma,
    ...opts,
  };
};

const packageT = initTRPC.context<typeof createPackageTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createPackageTRPCRouter = packageT.router;

const isClientAuthorized = packageT.middleware(async ({ ctx, next }) => {
  const { projectApiKey, projectId, prisma } = ctx;

  if (projectApiKey && projectId) {
    const foundKey = await prisma.projectApiKeys.findFirst({
      where: { hashedSecret: projectApiKey },
      include: {
        project: true,
        projectSecret: {
          select: {
            projectSecret: true,
          },
        },
      },
    });

    if (foundKey) {
      const {
        project,
        projectSecret: { projectSecret },
      } = foundKey;
      const { id } = project;

      if (decryptData(projectApiKey, projectSecret) === id) {
        console.debug(`User trying to access project with ID: ${projectId}`);
        return next({
          ctx: { ...ctx, project },
        });
      }
    }
  }

  throw new TRPCError({ code: "UNAUTHORIZED" });
});

export const authorizedClientProcedure =
  packageT.procedure.use(isClientAuthorized);

export const publicClientProcedure = packageT.procedure;
