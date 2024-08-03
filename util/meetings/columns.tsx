"use client";
import { ColumnDef } from "@tanstack/table-core";
import { Meeting } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(member.id)}
            >
              Copy Meeting ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/meeting-items/previous/${member.id}`)
              }
            >
              Review Previous Meeting
            </DropdownMenuItem>
            <DropdownMenuItem>Update Meeting Items</DropdownMenuItem>
            <DropdownMenuItem
                onClick={() =>
                    router.push(`/meeting-items/current/${member.id}`)
                }
            >
              Add New Meeting Items
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
