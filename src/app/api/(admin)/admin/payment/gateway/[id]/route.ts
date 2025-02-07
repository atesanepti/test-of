import { db } from "@/../prisma/index";
import { UpdatePaymentGetway } from "@/types/interface";
import { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const payload = (await req.json()) as UpdatePaymentGetway;
  const { id } = await params;
  try {
    const exitingGetway = await db.gateway.findUnique({
      where: {
        id: id,
      },
    });

    if (!exitingGetway) {
      return Response.json(
        {
          success: false,
          message: "Please create the getway ",
        },
        { status: 400 }
      );
    }

    await db.gateway.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });

    return Response.json(
      { success: true, message: "Getway was updated" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
