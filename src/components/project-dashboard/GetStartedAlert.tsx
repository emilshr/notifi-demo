import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export const GetStartedAlert = () => {
  return (
    <Link href="/docs" target="_blank">
      <Card>
        <CardBody>
          <div className="flex flex-col gap-y-4">
            <span className="text-2xl font-semibold">
              Let&apos;s get started
            </span>
            <span className="text-sm">Take me to docs</span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};
