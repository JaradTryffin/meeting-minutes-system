import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const meetingItemStatus = await prisma.meetingItemStatus.findUnique({
      where: { id: params.id },
      include: {
        meeting: true,
        meetingItem: true,
        responsiblePerson: true,
      },
    });

    if (!meetingItemStatus) {
      return NextResponse.json(
        { error: "Meeting item status not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(meetingItemStatus);
  } catch (error) {
    console.error(
      `[GET_MEETING_ITEM_STATUSES_${params.id}] - Failed to fetch meeting item status:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch meeting item status" },
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
    const { status, actionRequired, responsiblePersonId } = body;

    const updatedMeetingItemStatus = await prisma.meetingItemStatus.update({
      where: { id: params.id },
      data: {
        status,
        actionRequired,
        responsiblePersonId,
      },
      include: {
        meeting: true,
        meetingItem: true,
        responsiblePerson: true,
      },
    });

    return NextResponse.json(updatedMeetingItemStatus);
  } catch (error) {
    console.error("Failed to update meeting item status:", error);
    return NextResponse.json(
      { error: "Failed to update meeting item status" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.meetingItemStatus.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Meeting item status deleted successfully",
    });
  } catch (error) {
    console.error(
      `[DELETE_MEETING_ITEM_STATUSES_${params.id}] - Failed to delete meeting item status:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to delete meeting item status" },
      { status: 500 },
    );
  }
}
