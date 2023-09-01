import { useState } from "react";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { DemoVersionAlert } from "@/common/DemoVersionAlert";

export const CreateNewApiKey = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} color="primary">
        Create new API Key
      </Button>

      <DemoVersionAlert open={open} onClose={() => setOpen(false)} />
    </>
  );
};
