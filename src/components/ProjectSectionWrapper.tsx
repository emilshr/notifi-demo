import type { PropsWithChildren, ReactNode } from "react";

type Props = {
  sectionTitle: string;
  sectionDescription?: string;
  actionComponent?: ReactNode;
};

export const ProjectSectionWrapper = ({
  children,
  sectionTitle,
  sectionDescription,
  actionComponent,
}: PropsWithChildren<Props>) => {
  return (
    <div className="rounded-md border-[1px] p-4 dark:border-slate-900">
      <div className="flex flex-col gap-y-6">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-y-1">
            <div className="text-xl font-semibold">{sectionTitle}</div>
            <div className="text-sm text-slate-500">{sectionDescription}</div>
          </div>
          <div className="flex items-center">{actionComponent}</div>
        </div>
        {children}
      </div>
    </div>
  );
};
