import { NextRequest } from "next/server";
import { db } from "@/../prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { MultiplierHistoryInput } from "@/types/interface";

export const PUT = async (req: NextRequest) => {
  try {
    const { base_amount, profit, result, multiplier } =
      (await req.json()) as MultiplierHistoryInput;

    const user = await getCurrentUser();
    const history = await db.multiplierHistory.findUnique({
      where: {
        user_id: user!.id,
      },
    });

    if (!history) {
      await db.multiplierHistory.create({
        data: {
          user: {
            connect: {
              id: user!.id,
            },
          },
          history: {
            create: {
              base_amount,
              profit,
              multiplier,
              result,
            },
          },
        },
      });
    } else {
      await db.multiplierHistoryData.create({
        data: {
          base_amount,
          profit,
          multiplier,
          result,
          history: {
            connect: {
              id: history!.id,
            },
          },
        },
      });
    }

    return Response.json(
      { message: "History Updated", success: true },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { message: "Unknown Error Try agin", success: false },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const user = await getCurrentUser();

    const history = await db.multiplierHistory.findUnique({
      where: {
        user_id: user!.id,
      },
      include: {
        history: true,
      },
    });
    console.log({ history });
    return Response.json(
      { message: "History Fetched", success: true, payload: history },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { message: "Unknown Error Try agin", success: false },
      { status: 500 }
    );
  }
};
