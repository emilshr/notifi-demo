import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const DemoVersionAlert = ({ open, onClose }: Props) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalContent>
        <ModalHeader>This is a demo version of the application</ModalHeader>
        <ModalBody>
          <span className="text-default-500">
            Some functionalities of the dashboard are limited as this is a demo
            version. They are limited in order to avoid spamming.
          </span>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
