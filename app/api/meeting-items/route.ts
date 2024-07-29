import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const meetingItems = await prisma.meetingItem.findMany({
      include: {
        statuses: { include: { meeting: true, responsiblePerson: true } },
      },
    });
    return NextResponse.json(meetingItems);
  } catch (error) {
    console.error(`[GET_MEETING_ITEMS]- Failed to fetch meeting items:`, error);
    return NextResponse.json(
      { error: "Failed to fetch meeting items" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      description,
      dueDate,
      meetingId,
      status,
      actionRequired,
      responsiblePersonId,
    } = body;

    if (!description || !meetingId || !status || !responsiblePersonId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newMeetingItem = await prisma.meetingItem.create({
      data: {
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        statuses: {
          create: {
            status,
            actionRequired,
            meetingId,
            responsiblePersonId,
          },
        },
      },
      include: {
        statuses: { include: { meeting: true, responsiblePerson: true } },
      },
    });

    return NextResponse.json(newMeetingItem, { status: 201 });
  } catch (error) {
    console.error(
      "[POST_MEETING_ITEMS] - Failed to create meeting item:",
      error,
    );
    return NextResponse.json(
      { error: "Failed to create meeting item" },
      { status: 500 },
    );
  }
}
