import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import type { ErrorLogs } from "@prisma/client";

type Props = {
  error: ErrorLogs | undefined;
  open: boolean;
  onClose: () => void;
};

const ViewErrorModal = ({ open, onClose, error }: Props) => {
  return (
    <Modal isOpen={open} onOpenChange={onClose} backdrop="blur" size="5xl">
      <ModalContent>
        <ModalHeader>{error?.message}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3">
              <div>
                <div className="font-bold">Host</div>
                <div className="text-mono text-default-500">{error?.host}</div>
              </div>
              <div>
                <div className="font-bold">Column number</div>
                <div className="text-mono text-default-500">{error?.colNo}</div>
              </div>
              <div className="">
                <div className="font-bold">Line number</div>
                <div className="text-mono text-default-500">
                  {error?.lineNo}
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-y-2">
              <div className="text-2xl font-bold">User agent details</div>
              <div className="max-h-[250px] w-full overflow-auto rounded-md bg-default-300 p-4 font-mono sm:max-h-[300px]">
                {error?.userAgent}
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-y-2">
            <div className="text-2xl font-bold">Error stack</div>
            <div className="max-h-[250px] w-full overflow-auto rounded-md bg-default-300 p-4 font-mono sm:max-h-[300px]">
              <div>{error?.stack || "No error stack found"}</div>
            </div>
            <div className="flex w-full pt-2 sm:hidden">
              <Button
                color="success"
                fullWidth
                disabled={!error?.stack}
                onClick={(event) => {
                  event.preventDefault();
                  if (error?.stack) {
                    window.navigator.clipboard.writeText(error.stack);
                  }
                }}
              >
                Copy error stack
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewErrorModal;
