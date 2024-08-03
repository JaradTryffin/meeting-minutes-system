"use client";

import { ColumnDef } from "@tanstack/table-core";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { statuses } from "@/constants/statuses";
import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useRefreshHook } from "@/hooks/use-refresh";

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
  meetingItemStatus?: string;
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
        return (
          <Badge className="whitespace-nowrap" variant="secondary">
            {row.getValue("status")}
          </Badge>
        );
      } else {
        return <Badge>{row.getValue("status")}</Badge>;
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
  {
    id: "actions",
    cell: ({ row }) => {
      const meeting = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [status, setStatus] = useState(meeting.status);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const refreshHook = useRefreshHook();
      const handleStatusChange = async (newStatus: string) => {
        setStatus(newStatus);

        try {
          // Assuming you have an API endpoint to update the status
          await apiClient.patch(
            `/meeting-item-statuses/${meeting.meetingItemStatus}`,
            {
              status: newStatus,
            },
          );
          toast({
            description: "Successfully changed status",
            variant: "success",
          });
          router.refresh();
          refreshHook.onRefresh();
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={meeting.status}>
                  {statuses.map((status) => (
                    <DropdownMenuRadioItem
                      value={status.value}
                      key={status.label}
                      onClick={() => handleStatusChange(status.value)}
                    >
                      {status.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
