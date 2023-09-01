import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "@/env.mjs";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import type { NextApiRequest, NextApiResponse } from "next";

// export API handler
const nextApiHandler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});

// eslint-disable-next-line @typescript-eslint/require-await
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return nextApiHandler(req, res);
}
