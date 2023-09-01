import { api } from "@/utils/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateNewProjectModal = ({ onClose, open }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { projects } = api.useContext();

  const { isLoading, mutateAsync } = api.projects.createProject.useMutation({
    onSuccess() {
      projects.getProjects.refetch();
      projects.canUserCreateProjects.refetch();
    },
  });

  return (
    <Modal
      isOpen={open}
      onOpenChange={onClose}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader>New project</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-y-4">
            <Input
              label="Project name"
              required
              onChange={(event) => {
                event.stopPropagation();
                setName(event.currentTarget.value);
              }}
            />
            <Textarea
              label="Description of the project"
              onChange={(event) => {
                event.stopPropagation();
                setDescription(event.currentTarget.value);
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex w-full justify-end">
            <Button
              onClick={() => {
                mutateAsync({ projectName: name, description }).finally(() => {
                  onClose();
                });
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

export default CreateNewProjectModal;
