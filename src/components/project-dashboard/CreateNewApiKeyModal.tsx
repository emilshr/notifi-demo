import { api } from "@/utils/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateNewApiKeyModal = ({ onClose, open }: Props) => {
  const [name, setName] = useState("");

  const router = useRouter();
  const {
    query: { projectId },
  } = router;

  const { mutate, isLoading } = api.projects.createNewApiKey.useMutation({
    onSuccess() {
      setName("");
      onClose();
      router.replace(router.asPath).then(() => {
        toast("Created a new API Key", { type: "success" });
      });
    },
  });

  return (
    <Modal isOpen={open} onOpenChange={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader>New API Key</ModalHeader>
        <ModalBody>
          <Input
            required
            onChange={(event) => {
              event.stopPropagation();
              setName(event.currentTarget.value);
            }}
            label="API Key identifier"
          />
        </ModalBody>
        <ModalFooter>
          <div className="flex w-full justify-end">
            <Button
              color="primary"
              onClick={() => {
                mutate({ name, projectId: projectId as string });
              }}
              disabled={name === ""}
              isLoading={isLoading}
            >
              Create
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNewApiKeyModal;
