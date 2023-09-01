import { CommonPaddingWrapper } from "@/components/CommonPaddingWrapper";
import { CreateNewProject } from "@/components/dashboard/CreateNewProjectDialog";
import { ProjectListing } from "@/components/dashboard/ProjectListing";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Notifi</title>
        <meta name="description" content="Notifi - Error reporting made easy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-full w-full flex-col gap-y-6">
        <CommonPaddingWrapper>
          <div className="flex h-full flex-col gap-y-4">
            <CreateNewProject />
            <ProjectListing />
          </div>
        </CommonPaddingWrapper>
      </div>
    </>
  );
}
