import { db } from "@/../prisma";
import { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const agent = await db.users.findUnique({
      where: {
        id,
      },
    });

    if (!agent) {
      return Response.json(
        { success: false, message: "Unknown Error Try agin" },
        { status: 400 }
      );
    }

    await db.users.update({
      where: {
        id,
      },
      data: {
        role: "AGENT",
      },
    });

    return Response.json(
      {
        success: true,
        message: "User Updated",
      },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const agent = await db.users.findUnique({
      where: {
        id,
      },
    });

    if (!agent) {
      return Response.json(
        { success: false, message: "Unknown Error Try agin" },
        { status: 400 }
      );
    }

    await db.users.update({
      where: {
        id,
      },
      data: {
        role: "USER",
      },
    });

    return Response.json(
      {
        success: true,
        message: "Agents Deleted",
      },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
