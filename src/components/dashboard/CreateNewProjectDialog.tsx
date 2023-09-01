import { useState } from "react";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { api } from "@/utils/api";
import { AlertBanner } from "../AlertBanner";

const ProjectModal = dynamic(() => import("./CreateNewProjectModal"));

export const CreateNewProject = () => {
  const [open, setOpen] = useState(false);

  const { data, isFetching } = api.projects.canUserCreateProjects.useQuery(
    undefined,
    { refetchOnWindowFocus: false },
  );

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold">Your projects</h1>
        <Button
          onClick={() => setOpen(true)}
          isLoading={isFetching}
          disabled={!data}
        >
          Create new project
        </Button>
        <ProjectModal onClose={() => setOpen(false)} open={open} />
      </div>
      {!isFetching && !data && (
        <AlertBanner
          title="Upgrade to create unlimited projects"
          content="Only a maximum of 3 projects can be created in the free tier"
        />
      )}
    </div>
  );
};
