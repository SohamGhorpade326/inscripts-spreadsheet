import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import data from "../data/tableData";

type Row = typeof data[number];

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "job",
    header: "Job Request",
    cell: info => (
      <span className="text-blue-700 hover:underline cursor-pointer">
        {info.getValue() as string}
      </span>
    ),
  },
  { accessorKey: "submitted", header: "Submitted" },
  {
    accessorKey: "status",
    header: "Status",
    cell: info => {
      const status = info.getValue() as string;
      const colorMap: Record<string, string> = {
        "In-process": "bg-yellow-100 text-yellow-800",
        "Need to start": "bg-blue-100 text-blue-800",
        "Complete": "bg-green-100 text-green-800",
        "Blocked": "bg-red-100 text-red-800",
      };
      return (
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${colorMap[status] || "bg-gray-100 text-gray-800"}`}
        >
          {status}
        </span>
      );
    },
  },
  { accessorKey: "submitter", header: "Submitter" },
  {
    accessorKey: "url",
    header: "URL",
    cell: info => {
      const url = info.getValue() as string;
      return (
        <a href={`https://${url}`} className="text-blue-600 hover:underline" target="_blank">
          {url}
        </a>
      );
    },
  },
  { accessorKey: "assigned", header: "Assigned" },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: info => {
      const priority = info.getValue() as string;
      const colorMap: Record<string, string> = {
        High: "text-red-600",
        Medium: "text-yellow-600",
        Low: "text-green-600",
      };
      return (
        <span className={`font-semibold ${colorMap[priority] || ""}`}>
          {priority}
        </span>
      );
    },
  },
  { accessorKey: "dueDate", header: "Due Date" },
  { accessorKey: "estValue", header: "Est. Value" },
];

export default function Spreadsheet() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th className="p-3 border-b font-semibold" key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td className="p-3 border-b" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
