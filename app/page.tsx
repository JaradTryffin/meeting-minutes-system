import { Heading } from "@/components/Heading";
import axios from "axios";
import { DataTable } from "@/components/data-table";
import { memberColumns } from "@/util/members/columns";
import { Person } from "@prisma/client";
import prisma from "@/lib/prisma";

export default async function Home() {
  const members = await prisma.person.findMany();

  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading title="Members" description="Manage members" />
      </div>

      <DataTable columns={memberColumns} data={members} />
    </div>
  );
}
