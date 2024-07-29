import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const meetingItems = await prisma.meetingItemStatus.findMany({
      where: { meetingId: params.id },
      include: {
        meetingItem: true,
        responsiblePerson: true,
      },
    });

    return NextResponse.json(meetingItems);
  } catch (error) {
    console.error(
      `[GET_MEETING_ITEMS_${params.id}]- Failed to fetch meeting items:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch meeting items" },
      { status: 500 },
    );
  }
}
