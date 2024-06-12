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
  getKeyValue,
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
// const localData = {
//   count: 82,
//   results: [
//     {
//       name: "Luke Skywalker",
//       height: "172",
//       mass: "77",
//       birth_year: "19BBY",
//     },
//     // 其他数据...
//   ],
// };

export default function App() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useSWR(`http://127.0.0.1/api/result`, fetcher, {
    keepPreviousData: true,
  });

  // 使用本地数据或者API返回的数据，取决于 data 是否为 undefined
  const rowData = data;

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return rowData?.count ? Math.ceil(rowData.count / rowsPerPage) : 0;
  }, [rowData?.count, rowsPerPage]);

  const loadingState =
    isLoading || rowData?.results.length === 0 ? "loading" : "idle";

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
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="timestamp">timestamp</TableColumn>
        <TableColumn key="amount">amount</TableColumn>
      </TableHeader>
      <TableBody
        items={rowData?.results ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item: { name: string }) => (
          <TableRow key={item?.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
