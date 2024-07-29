import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const meetingItem = await prisma.meetingItem.findUnique({
      where: { id: params.id },
      include: {
        statuses: { include: { meeting: true, responsiblePerson: true } },
      },
    });

    if (!meetingItem) {
      return NextResponse.json(
        { error: "Meeting item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(meetingItem);
  } catch (error) {
    console.error(
      `[GET_MEETING_ITEMS_${params.id}]- Failed to fetch meeting item:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch meeting item" },
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
    const { description, dueDate, completedDate } = body;

    const updatedMeetingItem = await prisma.meetingItem.update({
      where: { id: params.id },
      data: {
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        completedDate: completedDate ? new Date(completedDate) : undefined,
      },
      include: {
        statuses: { include: { meeting: true, responsiblePerson: true } },
      },
    });

    return NextResponse.json(updatedMeetingItem);
  } catch (error) {
    console.error(
      `[PUT_MEETING_ITEMS_${params.id}]- Failed to update meeting item:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to update meeting item" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.meetingItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Meeting item deleted successfully" });
  } catch (error) {
    console.error(
      `[DELETE_MEETING_ITEMS_${params.id}]- Failed to delete meeting item:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to delete meeting item" },
      { status: 500 },
    );
  }
}
