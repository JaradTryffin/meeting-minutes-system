import { Heading } from "@/components/Heading";
import { DataTable } from "@/components/data-table";
import { memberColumns } from "@/util/members/columns";
import prisma from "@/lib/prisma";
import { MemberSheet } from "@/components/members/members-sheet";

export default async function Home() {
  const members = await prisma.person.findMany();

  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading title="Members" description="Manage members" />
      </div>

      <DataTable
        columns={memberColumns}
        data={members}
        FormSheet={MemberSheet}
      />
    </div>
  );
}
