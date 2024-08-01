import { ColumnDef } from "@tanstack/table-core";
import { Meeting } from "@prisma/client";



export const meetingColumns: ColumnDef<Meeting>[] = [
  {
    accessorKey: "meetingNumber",
    header: "Meeting no.",
  },
  {
    accessorKey: "formattedId",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "minutes",
    header: "Description",
  },
  {
    accessorKey: "meetingType.name",
    header: "Meeting Type",
  },
];
