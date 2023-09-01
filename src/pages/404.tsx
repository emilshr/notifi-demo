import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  const { status } = useSession();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
      <div className="flex items-center gap-x-2 text-2xl font-bold">
        Much empty! Looks like you&apos;re lost
        <div className="text-5xl">🤔</div>
      </div>
      <div>
        {status === "authenticated" ? (
          <Link href="/dashboard">
            <Button color="secondary">Go back to dashboard</Button>
          </Link>
        ) : (
          <Link href="/">
            <Button color="secondary">Go home</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
