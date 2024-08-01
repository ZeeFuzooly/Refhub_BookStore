import React, { useState } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table as MantineTable,
  ScrollArea,
  Button,
  Pagination,
  Table,
} from "@mantine/core";
import { Book, BookTableProps } from "../types/types";

const columns: ColumnDef<Book, any>[] = [
  {
    header: "Cover",
    accessorKey: "cover",
    cell: (info) => (
      <img
        src={info.getValue<string>()}
        alt="Book Cover"
        style={{ width: 80, height: 120 }}
      />
    ),
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Author",
    accessorKey: "author",
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: (info) => `$${info.getValue<number>()}`,
  },
];

const BookTable: React.FC<BookTableProps> = ({ books, onAddToCart }) => {
  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Create the table instance with typed options
  const table = useReactTable({
    data: books,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <ScrollArea>
        <MantineTable style={{ marginTop: "1rem" }}>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
                <Table.Td>
                  <Button
                    variant="light"
                    color="blue"
                    onClick={() => onAddToCart(row.original)}
                  >
                    Add to Cart
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </tbody>
        </MantineTable>
      </ScrollArea>

      <Pagination
        value={pagination.pageIndex + 1}
        onChange={(page) =>
          setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))
        }
        total={Math.ceil(books.length / pagination.pageSize)}
        style={{ marginTop: "1rem" }}
      />
    </div>
  );
};

export default BookTable;
