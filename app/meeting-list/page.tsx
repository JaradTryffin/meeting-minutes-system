import { Heading } from "@/components/Heading";
import prisma from "@/lib/prisma";
import { DataTable } from "@/components/data-table";
import { meetingColumns } from "@/util/meetings/columns";

export default async function MeetingListPage() {
  const meetings = await prisma.meeting.findMany({
    include: { meetingType: true },
  });

  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading title="Meetings" description="Manage meeets" />
      </div>

      <DataTable columns={meetingColumns} data={meetings} />
    </div>
  );
}
