import type { PropsWithChildren } from "react";

export const CommonPaddingWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full w-full px-0 pt-4 lg:px-10 xl:px-40">{children}</div>
  );
};
