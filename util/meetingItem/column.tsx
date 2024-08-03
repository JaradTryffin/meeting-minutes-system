"use client";

import { ColumnDef } from "@tanstack/table-core";
import { Badge } from "@/components/ui/badge";

export interface MeetingItemColumn {
  description: string;
  dueDate: Date;
  completedDate: Date | undefined;
  status: string;
  actionRequired: string;
  responsiblePerson: string;
  email: string;
  meetingNumber: string;
  meetingDate: Date;
  meetingMinutes: string;
}

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date: ${dateString}`);
    return dateString; // Return original string if invalid
  }

  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
}

export const meetingItemColumn: ColumnDef<MeetingItemColumn>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "dueDate",
    header: "Due",
    cell: ({ row }) => formatDate(row.getValue("dueDate")),
  },
  {
    accessorKey: "completedDate",
    header: "Completed",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.getValue("status") === "Open") {
        return <Badge variant="destructive">{row.getValue("status")}</Badge>;
      } else if (row.getValue("status") === "In Progress") {
        return <Badge variant="secondary">{row.getValue("status")}</Badge>;
      } else {
        return <Badge className="bg-green-600">{row.getValue("status")}</Badge>;
      }
    },
  },
  {
    accessorKey: "actionRequired",
    header: "Action Required",
  },
  {
    accessorKey: "responsiblePerson",
    header: "Responsible",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "meetingNumber",
    header: "Meeting",
    cell: ({ row }) => <Badge>{row.getValue("meetingNumber")}</Badge>,
  },
  {
    accessorKey: "meetingDate",
    header: "Meeting Date",
    cell: ({ row }) => formatDate(row.getValue("meetingDate")),
  },
  {
    accessorKey: "meetingMinutes",
    header: "Meeting Minutes",
  },
];
