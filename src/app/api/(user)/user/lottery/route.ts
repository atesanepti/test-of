import { getCurrentUser } from "@/lib/getCurrentUser";
import { db } from "../../../../../../prisma";

export const GET = async () => {
  try {
    const user = await getCurrentUser();

    const tickets = await db.lotteryTickets.findMany({
      where: {
        userId: user!.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalParticipation =
      (await db.lottery.count({
        where: {},
      })) + 400;

    return Response.json({
      message: "Fetched",
      success: true,
      payload: { tickets, totalParticipation },
    });
  } catch {
    return Response.json(
      { message: "Unknown Error Try aginn", success: false },
      { status: 500 }
    );
  }
};

export const POST = async () => {
  try {
    const user = await getCurrentUser();

    let lottery = await db.lottery.findFirst({
      where: {},
    });

    if (!lottery) {
      lottery = await db.lottery.create({
        data: {},
      });
    }

    await db.lotteryTickets.create({
      data: {
        amount: 20,
        lottery: { connect: { id: lottery.id } },
        users: {
          connect: {
            id: user!.id,
          },
        },
      },
    });

    await db.wallet.update({
      where: {
        user_id: user!.id,
      },
      data: {
        account: {
          decrement: 20,
        },
      },
    });

    return Response.json({ message: "Crated", success: true }, { status: 201 });
  } catch {
    return Response.json(
      { message: "Unknown Error Try aginn", success: false },
      { status: 500 }
    );
  }
};
