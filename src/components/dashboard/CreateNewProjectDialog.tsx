import { Button } from "@nextui-org/react";
import { AlertBanner } from "../AlertBanner";
import { useState } from "react";

export const CreateNewProject = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold">Your projects</h1>
        <Button onClick={() => setOpen(true)} disabled={open}>
          Create new project
        </Button>
      </div>

      {open && (
        <AlertBanner
          title="This is a demo version"
          content="This functionality is limited as the app is intended for demo purposes"
        />
      )}
    </div>
  );
};
