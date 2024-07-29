import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: params.id,
      },
      include: {
        meetingType: true,
        itemStatuses: true,
      },
    });

    if (!meeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    return NextResponse.json(meeting);
  } catch (error) {
    console.log(
      `[GET_MEETING_${params.id}] - Failed to fetch meeting : `,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch meeting" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { meetingNumber, date, meetingTypeId, previousMeetingId, minutes } =
      body;

    const updatedMeeting = await prisma.meeting.update({
      where: { id: params.id },
      data: {
        meetingNumber,
        date: date ? new Date(date) : undefined,
        meetingTypeId,
        previousMeetingId,
        minutes,
      },
      include: { meetingType: true },
    });

    return NextResponse.json(updatedMeeting);
  } catch (error) {
    console.log(
      `[PUT_MEETING_${params.id}] - Failed to update meeting : `,
      error,
    );
    return NextResponse.json(
      { error: "Failed to update meeting" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.meeting.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.log(
      `[DELETE_MEETING_${params.id}] - Failed to delete meeting : `,
      error,
    );
    return NextResponse.json(
      { error: "Failed to delete meeting" },
      { status: 500 },
    );
  }
}
