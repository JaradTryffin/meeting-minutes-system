import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const personItems = await prisma.meetingItemStatus.findMany({
      where: { responsiblePersonId: params.id },
      include: {
        meetingItem: true,
        meeting: true,
      },
      orderBy: { meeting: { date: "desc" } },
    });

    if (personItems.length === 0) {
      return NextResponse.json(
        { message: "No items found for this person" },
        { status: 404 },
      );
    }

    return NextResponse.json(personItems);
  } catch (error) {
    console.error(
      `[GET_PERSON_${params.id}_ITEMS] - Failed to fetch person items:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch person items" },
      { status: 500 },
    );
  }
}
