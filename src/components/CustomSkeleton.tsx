import { Skeleton } from "@nextui-org/react";
import type { PropsWithChildren } from "react";

type Props = {
  isLoaded?: boolean;
};

export const SkeletonIndicator = ({
  children,
  isLoaded = true,
}: PropsWithChildren<Props>) => {
  return (
    <Skeleton
      isLoaded={isLoaded}
      className="rounded-md bg-transparent dark:bg-transparent"
    >
      {children}
    </Skeleton>
  );
};
