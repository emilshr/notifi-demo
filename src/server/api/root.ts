import { createTRPCRouter as PackageHelper } from "@/server/api/trpc";
import { projectsRouter } from "./routers/projects";
import { packageRoutes } from "./routers/package.routes";
import { createPackageTRPCRouter } from "./package-trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = PackageHelper({
  projects: projectsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const packageRouter = createPackageTRPCRouter({
  package: packageRoutes,
});

export type PackageRouter = typeof packageRouter;
