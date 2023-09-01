import { env } from "@/env.mjs";
import { DocsIcon } from "@/svg-icons/docs-icon";
import { Button, Snippet } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const HomeScreenWidget = () => {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex h-full flex-col justify-center gap-y-24 px-0 lg:px-10 xl:px-40">
      <div className="flex flex-col items-center gap-y-8">
        <div className="xs:text-xl text-center text-3xl font-black tracking-[0.01rem] text-gray-700 dark:text-gray-200 sm:text-4xl md:text-6xl">
          Error reporting made easy
        </div>
        <div className="gap-y-1 text-center text-base text-gray-500 sm:px-10 sm:text-lg md:text-xl xl:px-40">
          Monitoring your app crashes just became super simple. View in-depth
          stack trace of the last prod killing bug
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="flex gap-x-4">
          {status === "authenticated" ? (
            <Button
              size="lg"
              color="primary"
              radius="sm"
              style={{
                fontWeight: 600,
              }}
              onClick={() => router.push("/dashboard")}
            >
              Get started
            </Button>
          ) : (
            <Button
              size="lg"
              color="primary"
              radius="sm"
              style={{
                fontWeight: 600,
              }}
              isLoading={loading}
              onClick={(event) => {
                event.preventDefault();
                setLoading(true);
                signIn("github", {
                  callbackUrl:
                    env.NEXT_PUBLIC_NODE_ENV === "development"
                      ? "http://localhost:3000/dashboard"
                      : `${window.location.href}dashboard`,
                }).finally(() => {
                  setLoading(false);
                });
              }}
            >
              Sign in to get started
            </Button>
          )}
          <a href="https://docs.notifi.site" target="_blank">
            <Button
              size="lg"
              color="default"
              radius="sm"
              style={{
                fontWeight: 600,
              }}
              endContent={<DocsIcon />}
            >
              Docs
            </Button>
          </a>
        </div>
        <div className="flex w-full items-center justify-center">
          <Snippet>npm install @emilshr/notifi</Snippet>
        </div>
      </div>
    </div>
  );
};
