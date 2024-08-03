import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const personId = searchParams.get("personId");
console.log("I am gere in persin")
    if (!personId) {
      return NextResponse.json(
        { error: "Person ID is required" },
        { status: 400 },
      );
    }

    const itemsByPerson = await prisma.meetingItemStatus.findMany({
      where: {
        responsiblePersonId: personId,
        meetingItem: {
          completedDate: null, // Only include incomplete items
        },
      },
      include: {
        meetingItem: true,
        meeting: true,
      },
      orderBy: { meetingItem: { dueDate: "asc" } },
    });

    // if (itemsByPerson.length === 0) {
    //   return NextResponse.json(
    //     { message: "No items found for this person" },
    //     { status: 404 },
    //   );
    // }

    return NextResponse.json(itemsByPerson);
  } catch (error) {
    console.error("Failed to generate items by person report:", error);
    return NextResponse.json(
      { error: "Failed to generate items by person report" },
      { status: 500 },
    );
  }
}
