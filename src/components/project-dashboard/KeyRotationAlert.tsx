import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { AlertBanner } from "../AlertBanner";

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
  const [openDemoAlert, setOpenDemoAlert] = useState(false);

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
          <AlertBanner
            title="This is a demo version"
            content="This functionality is limited as the app is intended for demo purposes"
          />
        </ModalBody>
        <ModalFooter>
          <div className="flex w-full justify-end gap-x-2">
            <Button onClick={() => onClose()} isLoading={loading}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => setOpenDemoAlert(true)}
              disabled
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
