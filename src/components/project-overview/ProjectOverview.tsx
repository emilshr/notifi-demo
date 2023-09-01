import React from "react";
import { GettingStarted } from "./GettingStarted";
import { ApiUsage } from "./ApiUsage";
import { ErrorsReportedToday } from "./ErrorsReportedToday";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export const ProjectOverview = () => {
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const { data, isFetched } = api.projects.getProjectOverview.useQuery({
    projectId,
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3">
        <GettingStarted />
      </div>
      <div className="col-span-3 sm:col-auto">
        <ErrorsReportedToday
          count={data?.dailyReports ?? 0}
          isFetched={isFetched}
        />
      </div>
      <div className="col-span-3 sm:col-auto">
        <ApiUsage apiCount={data?.apiConsumption ?? 0} isFetched={isFetched} />
      </div>
    </div>
  );
};
