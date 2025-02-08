import { db } from "@/lib/prisma";
import { CreatePaymentGateway } from "@/types/interface";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { method, pay_to, isActive } =
    (await req.json()) as CreatePaymentGateway;
  try {
    const exitingGetway = await db.gateway.findUnique({
      where: {
        method,
      },
    });

    if (exitingGetway) {
      return Response.json(
        {
          success: false,
          message: "This getway already Registered",
        },
        { status: 400 }
      );
    }

    await db.gateway.create({
      data: {
        method,
        pay_to,
        isActive,
      },
    });

    return Response.json(
      { success: true, message: "Getway added" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
