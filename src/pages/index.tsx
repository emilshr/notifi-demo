import { CommonPaddingWrapper } from "@/components/CommonPaddingWrapper";
import { CreateNewProject } from "@/components/dashboard/CreateNewProjectDialog";
import { ProjectListing } from "@/components/dashboard/ProjectListing";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <CommonPaddingWrapper>
        <div className="flex h-full flex-col gap-y-4">
          <CreateNewProject />
          <ProjectListing />
        </div>
      </CommonPaddingWrapper>
    </div>
  );
};

export default Dashboard;
