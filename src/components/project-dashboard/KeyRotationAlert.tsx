import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface Props {
  title: string;
  open: boolean;
  description: string;
  buttonLabel: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

const KeyRotationAlert = ({
  onConfirm,
  title,
  description,
  open,
  onClose,
  loading,
}: Props) => {
  return (
    <Modal
      isOpen={open}
      onOpenChange={onClose}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-y-4 text-slate-600">
            {description}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex w-full justify-end gap-x-2">
            <Button onClick={() => onClose()} isLoading={loading}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => onConfirm().finally(() => onClose())}
              isLoading={loading}
            >
              Randomize Secret
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default KeyRotationAlert;
