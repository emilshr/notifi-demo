import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import type { Project } from "@prisma/client";
import { DeleteProject } from "./DeleteProject";
import { ProjectSectionWrapper } from "@/components/ProjectSectionWrapper";
import { toast } from "react-toastify";
import { Button, Input, Textarea } from "@nextui-org/react";
import { SkeletonIndicator } from "../CustomSkeleton";

type Props = {
  project: Project | undefined | null;
  loading: boolean;
};

export const GeneralSettings = ({ project, loading }: Props) => {
  const {
    name: projectName = "",
    description: projectDescription = "",
    id = "",
  } = project || {};

  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState(projectDescription);

  useEffect(() => {
    setName(projectName);
  }, [projectName]);

  useEffect(() => {
    setDescription(projectDescription);
  }, [projectDescription]);

  console.log({ project, name, description });

  const { isLoading, mutate } = api.projects.updateProject.useMutation({
    onSuccess({ name: fetchedName, description: fetchedDescription }) {
      setName(fetchedName);
      setDescription(fetchedDescription);
      toast.success("Updated project details", { toastId: "project_update" });
    },
  });

  return (
    <>
      <ProjectSectionWrapper
        sectionTitle="General settings"
        sectionDescription="Change your project name and description"
      >
        <SkeletonIndicator isLoaded={loading}>
          <Input
            label="Project name"
            required
            type="text"
            className="bg-transparent"
            value={name}
            onChange={(event) => {
              event.stopPropagation();
              setName(event.currentTarget.value);
            }}
          />
        </SkeletonIndicator>
        <SkeletonIndicator isLoaded={loading}>
          <Textarea
            label="Project description"
            value={description}
            minRows={4}
            aria-multiline
            onChange={(event) => {
              event.stopPropagation();
              setDescription(event.currentTarget.value);
            }}
          />
        </SkeletonIndicator>
        <div className="flex justify-end">
          <SkeletonIndicator isLoaded={loading}>
            <Button
              color="secondary"
              disabled={
                isLoading ||
                (projectName === name && projectDescription === description) ||
                !loading
              }
              isLoading={isLoading}
              onClick={() => {
                mutate({ name, description, projectId: id });
              }}
            >
              Update
            </Button>
          </SkeletonIndicator>
        </div>
      </ProjectSectionWrapper>
      <ProjectSectionWrapper
        sectionTitle="Danger zone"
        sectionDescription="The following actions are destructive and cannot be reversed"
      >
        <div className="flex justify-end">
          <SkeletonIndicator isLoaded={loading}>
            <DeleteProject projectId={id} />
          </SkeletonIndicator>
        </div>
      </ProjectSectionWrapper>
    </>
  );
};
