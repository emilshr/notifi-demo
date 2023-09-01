import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useCallback } from "react";
import { SkeletonIndicator } from "../CustomSkeleton";

type Props = {
  count: number;
  isFetched: boolean;
};

export const ErrorsReportedToday = ({ count, isFetched }: Props) => {
  const getCountColor = useCallback(() => {
    if (count <= 10) {
      return "text-green-600";
    } else if (count <= 20) {
      return "text-yellow-600";
    }
    return "text-red-600";
  }, [count]);

  return (
    <Card
      classNames={{
        base: "p-2",
      }}
    >
      <CardHeader>
        <div className="flex flex-col gap-y-2">
          <span className="text-xl font-bold">Daily reports</span>
          <span className="text-md text-slate-600 dark:text-slate-400">
            Number of errors logged today
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <SkeletonIndicator isLoaded={isFetched}>
          <span className={`text-xl ${getCountColor()}`}>{count}</span>
        </SkeletonIndicator>
      </CardBody>
    </Card>
  );
};
