"use client";
import { Heading } from "@/components/Heading";
import apiClient from "@/lib/apiClient";
import { useCallback, useEffect, useState } from "react";
import { MeetingData } from "@/modals/meeting-items-previous.types";
import {
  meetingItemColumn,
  MeetingItemColumn,
} from "@/util/meetingItem/column";
import { DataTable } from "@/components/data-table";
import { MeetingItemSheet } from "@/components/meeting-item/meeting-item-sheet";

export default function MeetingItemPerMeetingPage({
  params,
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<MeetingData | undefined>(undefined);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiClient.get<MeetingData>(
        `meeting/${params.id}/previous`,
      );
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch meeting data:", error);
      // Handle error (e.g., show error message to user)
    }
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, []);

  function transformToMeetingItemColumns(
    meetingData: MeetingData | undefined,
  ): MeetingItemColumn[] {
    if (!meetingData) return [];

    return meetingData.itemStatuses.map((item) => ({
      description: item.meetingItem.description,
      dueDate: new Date(item.meetingItem.dueDate || ""),
      completedDate: item.meetingItem.completedDate
        ? new Date(item.meetingItem.completedDate)
        : undefined,
      status: item.status,
      meetingItemStatus: item.id,
      actionRequired: item.actionRequired,
      responsiblePerson: item.responsiblePerson.name,
      email: item.responsiblePerson.email,
      meetingNumber: item.meeting.formattedId,
      meetingDate: new Date(item.meeting.date),
      meetingMinutes: item.meeting.minutes || "",
    }));
  }

  const handleItemAdded = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const MeetingItemSheetWrapper = () => (
    <MeetingItemSheet
      previousMeetingId={data?.id ? data.id : ""}
      onItemAdded={handleItemAdded}
    />
  );

  const transformedData = transformToMeetingItemColumns(data);
  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading
          title={`Meeting Items ${data?.formattedId ?? ""}`}
          description="Manage meeting items"
        />
      </div>
      <DataTable
        columns={meetingItemColumn}
        data={transformedData}
        FormSheet={MeetingItemSheetWrapper}
      />
    </div>
  );
}
