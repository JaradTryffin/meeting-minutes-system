import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const currentMeeting = await prisma.meeting.findUnique({
      where: { id: params.id },
      include: {
        previousMeeting: {
          include: {
            meetingType: true,
            itemStatuses: {
              include: {
                meeting: true,
                responsiblePerson: true,
                meetingItem: true,
              },
            },
          },
        },
      },
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

    return NextResponse.json(currentMeeting.previousMeeting);
  } catch (error) {
    console.error(
      `[GET_MEETING_PREVIOUS_${params.id}]-Failed to fetch previous meeting:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch previous meeting" },
      { status: 500 },
    );
  }
}
