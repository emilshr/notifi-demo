import { SectionHeader } from "@/components/SectionHeader";
import { SidePaneWrapper } from "@/components/SidePaneWrapper";
import { ProjectSectionWrapper } from "@/components/ProjectSectionWrapper";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { DataGrid } from "@/components/data-grid/DataGrid";
import { useCallback, useState } from "react";
import type { ErrorLogs } from "@prisma/client";
import { Card, CardHeader } from "@nextui-org/react";
import dynamic from "next/dynamic";

const ViewErrorModal = dynamic(
  () => import("@/components/project-dashboard/ViewErrorModal"),
);

const columnHeaders = [
  {
    key: "userAgent",
    label: "User details",
  },
  {
    key: "host",
    label: "Host",
  },
  {
    key: "cookies",
    label: "Cookies",
  },
  {
    key: "origin",
    label: "Origin",
  },
  {
    key: "source",
    label: "Source",
  },
  {
    key: "lineNo",
    label: "Line no",
  },
  {
    key: "colNo",
    label: "Column no",
  },
  {
    key: "message",
    label: "Message",
  },
  {
    key: "stack",
    label: "Stack",
  },
  {
    key: "createdAt",
    label: "Time-stamp",
  },
];

export default function ActivityView() {
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedErrorId, setSelectedErrorId] = useState<string | undefined>(
    undefined,
  );

  const { data: totalPageCount = 1 } =
    api.projects.getProjectActivityPageCount.useQuery({
      projectId,
    });

  const { data, isFetching } = api.projects.getProjectActivities.useQuery({
    projectId,
    skip: (currentPage - 1) * 10,
  });

  const renderCell = useCallback(
    (apiKey: ErrorLogs, columnKey: keyof ErrorLogs) => {
      const cellValue = apiKey[columnKey];

      switch (columnKey) {
        case "createdAt":
        case "updatedAt":
          return (
            <div className="line-clamp-2">{cellValue?.toLocaleString()}</div>
          );
        default:
          return (
            <div className="line-clamp-2">
              {cellValue instanceof Date
                ? cellValue.toLocaleString()
                : cellValue}
            </div>
          );
      }
    },
    [],
  );

  return (
    <>
      <SidePaneWrapper>
        <SectionHeader
          title="App activity"
          description="You can find all the errors that your application has encountered here"
        />
        <ProjectSectionWrapper
          sectionTitle="See all those (un)caught errors"
          sectionDescription="Hopefully the list is small"
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col items-start gap-x-2 sm:flex-row sm:items-center">
                <div className="font-bold text-success-400">Pro-tip!</div>
                <div className="text-sm text-default-500">
                  Click on the record to view more details
                </div>
              </div>
            </CardHeader>
          </Card>
          <DataGrid
            columnHeaders={columnHeaders}
            data={data?.items ?? []}
            loading={isFetching}
            onPageChange={(updatedPage) => setCurrentPage(updatedPage)}
            itemKey="id"
            displayPagination
            totalPages={totalPageCount}
            currentPage={currentPage}
            renderCell={renderCell}
            onSelectionChange={(keys) => {
              const keySet = new Set(keys);
              let errorId = "";
              for (const key of keySet) {
                if (key) {
                  errorId = key.toString();
                }
              }
              setSelectedErrorId(errorId);
            }}
          />
        </ProjectSectionWrapper>
      </SidePaneWrapper>
      <ViewErrorModal
        error={data?.items.find((item) => item.id === selectedErrorId)}
        onClose={() => setSelectedErrorId(undefined)}
        open={!!selectedErrorId}
      />
    </>
  );
}
