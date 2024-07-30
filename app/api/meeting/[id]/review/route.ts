import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const currentMeeting = await prisma.meeting.findUnique({
      where: { id: params.id },
      include: { previousMeeting: true },
    });

    if (!currentMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    if (!currentMeeting.previousMeeting) {
      return NextResponse.json(
        { error: "No previous meeting found" },
        { status: 404 },
      );
    }

    const previousMeetingItems = await prisma.meetingItemStatus.findMany({
      where: { meetingId: currentMeeting.previousMeeting.id },
      include: {
        meetingItem: true,
        responsiblePerson: true,
      },
    });

    return NextResponse.json(previousMeetingItems);
  } catch (error) {
    console.error(
      `[GET_MEETING_REVIEW_${params.id}] - Failed to fetch review data:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch review data" },
      { status: 500 },
    );
  }
}
