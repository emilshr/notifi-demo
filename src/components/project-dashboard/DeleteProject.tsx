import { DemoVersionAlert } from "@/common/DemoVersionAlert";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export const DeleteProject = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <DemoVersionAlert open={open} onClose={() => setOpen(false)} />
    </>
  );
};
