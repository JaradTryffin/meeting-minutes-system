"use client";

import { ColumnDef } from "@tanstack/table-core";
import { Person } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useMemberSheet } from "@/hooks/use-sheet";
import apiClient from "@/lib/apiClient";
import { useMemberEdit } from "@/hooks/use-member-edit";

// Function to get a random avatar image
const getRandomAvatar = () => {
  const randomNumber = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
  return `/0${randomNumber}.png`;
};

// Function to get initials from a name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
const memberEdit = useMemberEdit.getState();

async function getMemberById(id: string) {
  await apiClient.get(`/persons/${id}`).then((res) => {
    memberEdit.setMember(res.data);
  });
}

export const memberColumns: ColumnDef<Person>[] = [
  {
    id: "avatar",
    cell: ({ row }) => {
      const avatarSrc = getRandomAvatar();
      const initials = getInitials(row.original.name);
      return (
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;
      const memberSheet = useMemberSheet.getState();

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
              Copy Member Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await getMemberById(member.id).then(() => {
                  memberSheet.onOpen();
                });
              }}
            >
              Update Member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
