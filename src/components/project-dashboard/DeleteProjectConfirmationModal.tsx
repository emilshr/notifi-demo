import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  isLoading: boolean;
};

const DeleteProjectConfirmationModal = ({
  onClose,
  onDelete,
  open,
  isLoading,
}: Props) => {
  return (
    <Modal isOpen={open} onOpenChange={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader>
          <div className="">Confirm your action</div>
        </ModalHeader>
        <ModalBody>
          <div className="">
            Are you sure you want to delete this project? This action is
            irreversible!
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex w-full justify-end gap-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              color="danger"
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => onDelete()}
            >
              Delete
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProjectConfirmationModal;
