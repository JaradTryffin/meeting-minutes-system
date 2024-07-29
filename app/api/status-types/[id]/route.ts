import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const statusType = await prisma.statusType.findUnique({
      where: { id: params.id },
    });

    if (!statusType) {
      return NextResponse.json(
        { error: "Status type not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(statusType);
  } catch (error) {
    console.error(
      `[GET_STATUS_TYPES_${params.id}]- Failed to fetch status type:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch status type" },
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
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updatedStatusType = await prisma.statusType.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(updatedStatusType);
  } catch (error) {
    console.error(
      `[PUT_STATUS_TYPES_${params.id}] - Failed to update status type:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to update status type" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.statusType.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Status type deleted successfully" });
  } catch (error) {
    console.error("Failed to delete status type:", error);
    return NextResponse.json(
      {
        error: `[DELETE_STATUS_TYPES_${params.id}]- Failed to delete status type`,
      },
      { status: 500 },
    );
  }
}
