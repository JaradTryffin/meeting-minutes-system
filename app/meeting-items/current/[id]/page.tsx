import { Heading } from "@/components/Heading";
import prisma from "@/lib/prisma";
import {
  meetingItemColumn,
  MeetingItemColumn,
} from "@/util/meetingItem/column";
import { DataTable } from "@/components/data-table";

export default async function MeetingItemPerMeetingCurrentPage({
  params,
}: {
  params: { id: string };
}) {
  const meetingItems = await prisma.meetingItemStatus.findMany({
    where: { meetingId: params.id },
    include: {
      meeting: true,
      meetingItem: true,
      responsiblePerson: true,
    },
  });

  function transformMeetingData(rawData: any[]): MeetingItemColumn[] {
    return rawData.map((item) => ({
      description: item.meetingItem.description,
      dueDate: new Date(item.meetingItem.dueDate),
      completedDate: item.meetingItem.completedDate
        ? new Date(item.meetingItem.completedDate)
        : undefined,
      status: item.status,
      actionRequired: item.actionRequired,
      responsiblePerson: item.responsiblePerson.name,
      email: item.responsiblePerson.email,
      meetingNumber: item.meeting.formattedId,
      meetingDate: new Date(item.meeting.date),
      meetingMinutes: item.meeting.minutes,
    }));
  }
  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading title={`Meeting Items `} description="Manage meeting items" />
      </div>

      <DataTable
        columns={meetingItemColumn}
        data={transformMeetingData(meetingItems)}
      />
    </div>
  );
}
