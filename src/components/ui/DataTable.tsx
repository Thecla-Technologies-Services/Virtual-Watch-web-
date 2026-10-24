import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  initialPageSize?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  initialPageSize = 5,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  })

  const { pageIndex, pageSize } = table.getState().pagination
  const totalEntries = table.getFilteredRowModel().rows.length
  const pageCount = table.getPageCount()
  
  const startEntry = totalEntries === 0 ? 0 : pageIndex * pageSize + 1
  const endEntry = Math.min((pageIndex + 1) * pageSize, totalEntries)

  return (
    <div className="w-full space-y-4">
      {/* Header Controls (Search & Page Size Select) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* {searchKey ? (
          <div className="relative max-w-xs w-full">
            <svg
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold border border-slate-200/80 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900  dark:text-slate-100 placeholder-slate-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
            />
          </div>
        ) : (
          <div />
        )} */}

        {/* <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-muted ">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900  dark:text-slate-100 px-2.5 py-1.5 text-xs font-bold outline-none focus:border-primary transition-all shadow-sm cursor-pointer"
          >
            {[5, 10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      {/* Main Table Card */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white border-b border-[#E5E5E5]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-[#E5E5E5]">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-[#333448] text-xs font-semibold py-4 px-5 h-auto">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-[#E5E5E5]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-[#333448] text-[13px] font-medium py-3.5 px-5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-slate-400 dark:text-muted font-semibold"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2 px-4">
        {/* Entry Count Display */}
        <div className="text-[12px] font-bold text-muted ">
          Showing <span className="font-extrabold  ">{startEntry}</span> to{" "}
          <span className="font-extrabold  ">{endEntry}</span> of{" "}
          <span className="font-extrabold  ">{totalEntries}</span> entries
        </div>

        {/* Navigation Buttons and Current Page display */}
        <div className="flex items-center gap-5">
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-xs font-bold gap-1 px-3 py-1.5 bg-[#F5F5F6] border-0 hover:bg-slate-50 transition-colors shadow-xs rounded-sm disabled:opacity-45 disabled:pointer-events-none cursor-pointer"
            >
             <ChevronLeft size={12} />
              Previous
            </Button>
            <div className="text-[12px] font-bold text-muted ">
            Page{" "}
            <span className="font-extrabold  ">
              {pageCount === 0 ? 0 : pageIndex + 1}
            </span>{" "}
            of{" "}
            <span className="font-extrabold  ">
              {pageCount}
            </span>
          </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-xs font-bold gap-1 px-3 py-1.5 bg-[#F5F5F6] border-0 hover:bg-slate-50 transition-colors shadow-xs rounded-sm disabled:opacity-45 disabled:pointer-events-none cursor-pointer"
            >
              Next
              <svg
                className="h-3.5 w-3.5 stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
