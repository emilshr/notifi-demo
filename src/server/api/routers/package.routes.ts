import { z } from "zod";
import {
  authorizedClientProcedure,
  createPackageTRPCRouter,
} from "../package-trpc";

export const packageRoutes = createPackageTRPCRouter({
  writeErrorLog: authorizedClientProcedure
    .input(
      z.object({
        event: z.string().optional(),
        source: z.string().optional(),
        lineNo: z.number().optional(),
        colNo: z.number().optional(),
        error: z.object({
          message: z.string().optional(),
          stack: z.string().optional(),
        }),
      }),
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          host,
          userAgent,
          origin,
          project: { id },
        },
        input: {
          error: { message, stack },
          colNo,
          lineNo,
          source,
        },
      }) => {
        console.log({ message, stack });
        return await prisma.errorLogs.create({
          data: {
            projectId: id,
            host,
            userAgent,
            origin,
            colNo,
            lineNo,
            source,
            stack,
            message,
          },
        });
      },
    ),
});
