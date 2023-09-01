import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { SkeletonIndicator } from "../CustomSkeleton";

type Props = {
  apiCount: number;
  isFetched: boolean;
};

export const ApiUsage = ({ apiCount, isFetched }: Props) => {
  return (
    <Card
      classNames={{
        base: "p-2",
      }}
    >
      <CardHeader>
        <div className="flex flex-col gap-y-2">
          <span className="text-xl font-bold">API consumption</span>
          <span className="text-md text-slate-600 dark:text-slate-400">
            Number of keys issued
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <SkeletonIndicator isLoaded={isFetched}>
          <span className="text-xl">{apiCount}</span>
        </SkeletonIndicator>
      </CardBody>
    </Card>
  );
};
