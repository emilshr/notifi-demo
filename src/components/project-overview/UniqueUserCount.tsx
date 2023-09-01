import { Card, CardBody, CardHeader } from "@nextui-org/react";

type Props = {
  count: number;
};

export const UniqueUserCount = ({ count }: Props) => {
  return (
    <Card
      classNames={{
        base: "p-2",
      }}
    >
      <CardHeader>
        <div className="flex flex-col gap-y-2">
          <span className="text-xl font-bold">User count</span>
          <span className="text-md text-slate-600 dark:text-slate-400">
            Number of unique users who have opened your app
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <span className="text-xl">{count}</span>
      </CardBody>
    </Card>
  );
};
