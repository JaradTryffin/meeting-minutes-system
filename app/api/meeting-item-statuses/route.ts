import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const meetingItemStatuses = await prisma.meetingItemStatus.findMany({
      include: {
        meeting: true,
        meetingItem: true,
        responsiblePerson: true,
      },
    });
    return NextResponse.json(meetingItemStatuses);
  } catch (error) {
    console.error(
      "[GET_MEETING_ITEM-STATUSES]- Failed to fetch meeting item statuses:",
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch meeting item statuses" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      status,
      actionRequired,
      meetingId,
      meetingItemId,
      responsiblePersonId,
    } = body;

    if (!status || !meetingId || !meetingItemId || !responsiblePersonId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newMeetingItemStatus = await prisma.meetingItemStatus.create({
      data: {
        status,
        actionRequired,
        meetingId,
        meetingItemId,
        responsiblePersonId,
      },
      include: {
        meeting: true,
        meetingItem: true,
        responsiblePerson: true,
      },
    });

    return NextResponse.json(newMeetingItemStatus, { status: 201 });
  } catch (error) {
    console.error(
      "[POST_MEETING_ITEM_STATUSES] - Failed to create meeting item status:",
      error,
    );
    return NextResponse.json(
      { error: "Failed to create meeting item status" },
      { status: 500 },
    );
  }
}
