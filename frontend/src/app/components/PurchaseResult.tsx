import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import useSWR from "swr";

const fetcher = (url: any) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getKeyValue = (item: any, key: string) => {
  return item[key] ?? "";
};

export default function App() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const { data, error } = useSWR(`http://127.0.0.1/api/result`, fetcher, {
    keepPreviousData: true,
  });

  const loadingState = !data ? "loading" : "idle";
  const rowData = data?.buyers || [];

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedData = useMemo(() => {
    return rowData.slice(startIndex, endIndex);
  }, [rowData, startIndex, endIndex]);

  const totalPages = Math.ceil(rowData.length / rowsPerPage);

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        totalPages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="index">Index</TableColumn>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="timestamp">Timestamp</TableColumn>
      </TableHeader>
      <TableBody
        items={paginatedData}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item: { name: string }) => (
          <TableRow key={item?.name}>
            <TableCell>
              {startIndex + paginatedData.indexOf(item) + 1}
            </TableCell>
            <TableCell>{getKeyValue(item, "name")}</TableCell>
            <TableCell>{getKeyValue(item, "timestamp")}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
