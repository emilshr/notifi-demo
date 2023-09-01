import type { NextApiRequest, NextApiResponse } from "next";
import { renderTrpcPanel } from "trpc-panel";
import { packageRouter } from "../../server/api/root";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).send(
    renderTrpcPanel(packageRouter, {
      url: "http://localhost:3000/api/packageTrpc",
      transformer: "superjson",
      logFailedProcedureParse: true,
    }),
  );
}
