import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CheckAuthModal = dynamic(() => import("./CheckAuthModal"));

export const CheckAuthDialog = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(status === "loading");

  useEffect(() => {
    if (status !== "loading") {
      setOpen(false);
    }
  }, [status]);

  return <CheckAuthModal open={open} onClose={() => setOpen(false)} />;
};
