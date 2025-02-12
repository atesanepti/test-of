import { db } from "@/lib/prisma";
import { WithdrawNumberUpdateInput } from "@/types/interface";
import { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const { number } = (await req.json()) as WithdrawNumberUpdateInput;
    console.log({id})
    console.log({number})
    const withdraw = await db.withdraws.findUnique({
      where: {
        id,
      },
    });

    if (!withdraw) {
      return Response.json(
        { success: false, message: "Withdraw not found" },
        { status: 404 }
      );
    }

    await db.withdraws.update({
      where: { id },
      data: { pay_to: number },
    });

    return Response.json(
      { success: true, message: "Withdraw Number updated" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
