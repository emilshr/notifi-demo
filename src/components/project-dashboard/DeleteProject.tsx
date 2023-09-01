import { api } from "@/utils/api";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

const DeleteProjectConfirmationModal = dynamic(
  () => import("./DeleteProjectConfirmationModal"),
);

type Props = {
  projectId: string;
};

export const DeleteProject = ({ projectId }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = api.projects.deleteProject.useMutation({
    onSuccess() {
      router.push("/dashboard");
    },
  });
  return (
    <>
      <Button
        color="danger"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete project
      </Button>
      <DeleteProjectConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        isLoading={isLoading}
        onDelete={() => mutate({ projectId })}
      />
    </>
  );
};
