import { AlertBanner } from "@/components/AlertBanner";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { CommonPaddingWrapper } from "@/components/CommonPaddingWrapper";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

const FreeTierCard = () => {
  return (
    <Card
      radius="md"
      classNames={{
        base: "ring-1 ring-secondary-500 ring-offset-2 ring-offset-transparent rounded-md gap-y-4 p-2",
        header: "text-3xl font-extrabold text-secondary-800",
        body: "p-3 text-base font-normal",
      }}
    >
      <CardHeader>
        <div className="flex w-full flex-col gap-y-2">
          <span>Hobby</span>
          <span className="text-base font-normal text-default-700">
            Free forever. However, few of the functionalities are limited
          </span>
          <span className="pt-4 text-5xl">0$</span>
        </div>
      </CardHeader>
      <div className="px-3">
        <Divider />
      </div>
      <CardBody>
        <div className="flex flex-col gap-y-2">
          <ul className="list-disc pl-4 text-secondary-700">
            <li>
              <span>5 free projects</span>
            </li>
            <li>
              <span>
                Errors which are older than 90 days will not be stored
              </span>
            </li>
            <li>
              <span>
                Threshold of 10 errors that can be reported in a minute
              </span>
            </li>
          </ul>
        </div>
      </CardBody>
      <CardFooter>
        <AlertBanner title="You're on Hobby tier right now" />
      </CardFooter>
    </Card>
  );
};

const PaidTierCard = () => {
  return (
    <Card
      radius="md"
      classNames={{
        base: "rounded-md gap-y-4 p-2",
        header: "text-3xl font-extrabold text-primary-800",
        body: "p-3 text-base font-normal",
      }}
    >
      <CardHeader>
        <div className="flex w-full flex-col gap-y-2">
          <span>Pro</span>
          <span className="text-base font-normal text-default-700">
            For developers who have multiple projects hosted everywhere
          </span>
          <span className="pt-4 text-5xl">30$ yearly</span>
        </div>
      </CardHeader>
      <div className="px-3">
        <Divider />
      </div>
      <CardBody>
        <div className="flex flex-col gap-y-2">
          <ul className="list-disc pl-4 text-primary-700">
            <li>
              <span>Unlimited projects</span>
            </li>
            <li>
              <span>
                Errors from your project&apos;s inception will be stored.
                Nothing would be lost
              </span>
            </li>
            <li>
              <span>No rate limiting for your application</span>
            </li>
            <li>
              <span>Priority support</span>
            </li>
          </ul>
        </div>
      </CardBody>
      <CardFooter>
        <AnnouncementBanner title="Will be available soon" />
      </CardFooter>
    </Card>
  );
};

export default function Page() {
  return (
    <CommonPaddingWrapper>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
        <div className="flex flex-col items-start gap-y-2 sm:items-center">
          <span className="text-4xl font-extrabold">Pricing</span>
          <span className="text-lg text-default-400">
            Plans that empower you to ship without friction.
          </span>
        </div>
        <div className="grid h-full grid-cols-1 items-center justify-center gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-y-0">
          <FreeTierCard />
          <PaidTierCard />
        </div>
      </div>
    </CommonPaddingWrapper>
  );
}
