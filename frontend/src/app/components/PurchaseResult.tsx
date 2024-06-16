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
  getKeyValue as getKey,
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

// 修改 getKey 函數，確保能正確取得屬性值
const getKeyValue = (item: any, key: string) => {
  return getKey(item, key) ?? "";
};

export default function App() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useSWR(`http://127.0.0.1/api/result`, fetcher, {
    keepPreviousData: true,
  });

  // 使用本地数据或者API返回的数据，取决于 data 是否为 undefined
  const rowData = data?.buyers || [];

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return Math.ceil(rowData.length / rowsPerPage);
  }, [rowData.length, rowsPerPage]);

  const loadingState = !data ? "loading" : "idle";

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
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
        items={rowData}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={item?.name}>
            <TableCell>
              {(page - 1) * rowsPerPage + rowData.indexOf(item) + 1}
            </TableCell>
            <TableCell>{getKeyValue(item, "name")}</TableCell>
            <TableCell>{getKeyValue(item, "timestamp")}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
