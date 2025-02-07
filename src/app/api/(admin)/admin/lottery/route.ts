import { db } from "@/../prisma";
import { createLog } from "@/lib/log";
import { LotteryResultInput } from "@/types/interface";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const tickets = await db.lotteryTickets.findMany({
      where: {
        status: "CHECKING",
      },
    });

    const totalCollection = (
      await db.lotteryTickets.aggregate({
        where: {
          status: "CHECKING",
        },
        _sum: {
          amount: true,
        },
      })
    )._sum.amount;

    const totalParticipation = await db.lotteryTickets.count({
      where: {
        status: "CHECKING",
      },
    });

    return Response.json(
      {
        success: true,
        message: "Fetched",
        payload: { tickets, totalParticipation, totalCollection },
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

export const PUT = async (req: NextRequest) => {
  try {
    const usersTickets = (await req.json()) as LotteryResultInput[];

    const usersId = usersTickets.map((v) => {
      return v.id;
    });

    await db.lotteryTickets.updateMany({
      where: {
        id: {
          notIn: usersId,
        },
      },
      data: {
        status: "UNMATCHED",
      },
    });

    usersTickets.forEach(async (v) => {
      const updatedLotary = await db.lotteryTickets.update({
        where: {
          id: v.id,
        },
        data: {
          status: "MATCHED",
          prize: v.prize,
        },
      });

      await db.wallet.update({
        where: {
          id: updatedLotary!.userId,
        },
        data: {
          account: {
            increment: v.prize,
          },
        },
      });

      await createLog(updatedLotary.userId, {
        log_type: "DEPOSIT",
        title: "Lottery Winner",
        des: `Congratulation You won ${v.prize} pool of Lottery`,
        amount: v.prize,
      });
    });

    return Response.json(
      { success: true, message: "Fetched" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
