// import { Pagination } from "./Pagination";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  type Selection,
  type SelectionMode,
  Skeleton,
} from "@nextui-org/react";
import type { TableColumnHeader } from "@/common/types";

type Props<T> = {
  data: T[];
  itemKey: keyof T;
  columnHeaders: TableColumnHeader[];
  onPageChange: (updatedPageNumber: number) => void;
  loading: boolean;
  currentPage?: number;
  displayPagination?: boolean;
  renderCell?: (item: T, columnKey: keyof T) => JSX.Element;
  totalPages?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectionChange?: (selectedKeys: Selection) => any;
  selectionMode?: SelectionMode;
};

export const DataGrid = <T,>({
  columnHeaders,
  data,
  itemKey,
  displayPagination = false,
  renderCell,
  totalPages = 1,
  onPageChange,
  currentPage = 1,
  onSelectionChange,
  selectionMode = "single",
  loading,
}: Props<T>) => {
  return (
    <>
      <Table
        isHeaderSticky
        selectionMode={selectionMode}
        onSelectionChange={onSelectionChange}
      >
        <TableHeader columns={columnHeaders}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
              allowsResizing
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data}
          isLoading={loading}
          loadingContent={
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
              </Skeleton>
            </div>
          }
        >
          {(item) => (
            <TableRow key={item[itemKey] as string} className="cursor-pointer">
              {(columnKey) => (
                <TableCell>
                  {renderCell
                    ? renderCell(item, columnKey as keyof T)
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {displayPagination && (
        <Pagination
          page={currentPage}
          total={totalPages}
          initialPage={1}
          isCompact
          showControls
          showShadow
          onChange={onPageChange}
          loop
        />
      )}
    </>
  );
};
