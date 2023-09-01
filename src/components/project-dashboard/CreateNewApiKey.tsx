import { useState } from "react";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";

const NewApiKeyModal = dynamic(() => import("./CreateNewApiKeyModal"));

export const CreateNewApiKey = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} color="primary">
        Create new API Key
      </Button>
      <NewApiKeyModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
