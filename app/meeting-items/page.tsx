import { Heading } from "@/components/Heading";
import prisma from "@/lib/prisma";

import {
  meetingItemColumn,
  MeetingItemColumn,
} from "@/util/meetingItem/column";
import { DataTable } from "@/components/data-table";

export default async function MeetingItemPage() {
  const meetingItems = await prisma.meetingItem.findMany({
    include: {
      statuses: { include: { meeting: true, responsiblePerson: true } },
    },
  });

  function transformData(data: any[]): MeetingItemColumn[] {
    return data.map((item) => {
      const status = item.statuses[0];
      const meeting = status.meeting;
      const responsiblePerson = status.responsiblePerson;

      return {
        description: item.description,
        dueDate: new Date(item.dueDate),
        completedDate: item.completedDate
          ? new Date(item.completedDate)
          : undefined,
        status: status.status,
        meetingItemStatus: status.id,
        actionRequired: status.actionRequired,
        responsiblePerson: responsiblePerson.name,
        email: responsiblePerson.email,
        meetingNumber: meeting.formattedId,
        meetingDate: new Date(meeting.date),
        meetingMinutes: meeting.minutes,
      };
    });
  }

  const formattedData = transformData(meetingItems);

  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading title="Meeting Items" description="Manage meeting items" />
      </div>

      <DataTable columns={meetingItemColumn} data={formattedData} />
    </div>
  );
}
