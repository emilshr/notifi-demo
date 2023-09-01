import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CheckAuthModal = ({ onClose, open }: Props) => {
  return (
    <Modal
      isOpen={open}
      onOpenChange={(modalState) => {
        if (!modalState) {
          onClose();
        }
      }}
      hideCloseButton
      backdrop="blur"
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader className="flex w-full justify-center text-2xl">
          Checking for login status
        </ModalHeader>
        <ModalBody className="pb-4">
          <Spinner />
          <span className="flex w-full justify-center text-small text-default-400">
            Please hold on while we run the check
          </span>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CheckAuthModal;
