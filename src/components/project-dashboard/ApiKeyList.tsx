/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { DataGrid } from "../data-grid/DataGrid";
import type { TableColumnHeader } from "@/common/types";
import { useCallback } from "react";
import { Button } from "@nextui-org/react";

type CellProps = {
  hashedSecret: string;
  id: string;
  name: string;
  createdAt: Date;
};

const columnHeaders: TableColumnHeader[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "hashedSecret",
    label: "API Key",
  },
  {
    key: "createdAt",
    label: "Timestamp",
  },
  {
    key: "actions",
    label: "",
  },
];

export const ApiKeyList = ({
  apiKeys,
}: {
  apiKeys: CellProps[];
  projectId: string;
}) => {
  const renderCell = useCallback((apiKey: CellProps, columnKey: string) => {
    const cellValue = apiKey[columnKey as keyof CellProps];

    switch (columnKey) {
      case "name":
        return <span className="font-bold">{cellValue as string}</span>;
      case "hashedSecret":
        const { length } = cellValue as string;
        return (
          <span className="font-mono">
            NOTIFI-XXXXXXXXXXXXXXXXXXXX
            {(cellValue as string).slice(length - 4, length - 1)}
          </span>
        );
      case "createdAt":
        return <>{(cellValue as Date).toLocaleString()}</>;
      case "actions":
        return (
          <div className="flex gap-x-2">
            <Button
              color="secondary"
              variant="light"
              onClick={() =>
                window.navigator.clipboard.writeText(apiKey.hashedSecret)
              }
            >
              Copy
            </Button>
            <Button color="danger" variant="light">
              Delete
            </Button>
          </div>
        );
      default:
        return <>cellValue</>;
    }
  }, []);

  return (
    <DataGrid<CellProps>
      columnHeaders={columnHeaders}
      data={apiKeys}
      itemKey="id"
      loading={false}
      renderCell={renderCell}
      selectionMode="none"
      onPageChange={(_updatedPage) => {
        console.log("Changing page");
      }}
    />
  );
};
