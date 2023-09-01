import { ProjectSectionWrapper } from "../ProjectSectionWrapper";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import dynamic from "next/dynamic";

const KeyRotationAlert = dynamic(() => import("./KeyRotationAlert"));

interface Props {
  secret: string;
}
export const SecretConfiguration = ({ secret }: Props) => {
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const [projectSecret, setProjectSecret] = useState(secret);
  const [open, setOpen] = useState(false);

  const { mutateAsync, isLoading } =
    api.projects.createNewApiKeySecret.useMutation({
      onSuccess(data) {
        setProjectSecret(data.tokenSecret);
      },
    });

  return (
    <>
      <ProjectSectionWrapper
        sectionTitle="API Key secret"
        sectionDescription="This secret will be used to hash your API keys"
      >
        <div className="flex gap-x-2">
          <div className="flex-1">
            <Input disabled value={projectSecret} className="font-mono" />
          </div>
          <Button
            color="secondary"
            disabled={isLoading}
            isLoading={isLoading}
            onClick={() => {
              setOpen(true);
            }}
          >
            Randomize
          </Button>
        </div>
      </ProjectSectionWrapper>
      <KeyRotationAlert
        title="Warning! You are about to change your API Secrets"
        open={open}
        description="Doing so would make the existing key invalid"
        buttonLabel="Randomize"
        onClose={() => setOpen(false)}
        onConfirm={async () => {
          await mutateAsync({ projectId });
        }}
        loading={isLoading}
      />
    </>
  );
};
