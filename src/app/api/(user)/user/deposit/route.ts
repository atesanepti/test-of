import { db } from "@/lib/prisma";
import fetchSiteInfo from "@/data/siteSetting";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { createLog } from "@/lib/log";
import { CreateDeposit } from "@/types/interface";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { amount, gatewayId, transactionId, walletNumber } =
    (await req.json()) as CreateDeposit;
  const user = await getCurrentUser();

  const existingDeposit = await db.deposits.findFirst({
    where: {
      user_id: user!.id,
      transaction_id: transactionId,
    },
  });

  if (existingDeposit) {
    return Response.json(
      { message: `This Request is already checked`, success: false },
      { status: 400 }
    );
  }

  const recentRecords = await db.deposits.findFirst({
    where: {
      user_id: user!.id,
      createdAt: {
        gte: new Date(Date.now() - 5 * 60 * 1000),
      },
    },
  });

  if (recentRecords) {
    return Response.json(
      { message: `You have a request on checking! Try later`, success: false },
      { status: 400 }
    );
  }

  const minDeposit = (await fetchSiteInfo())?.minDeposit || 0;

  if (amount < minDeposit) {
    return Response.json(
      { message: `Minimum Desposit ${minDeposit} BDT`, success: true },
      { status: 400 }
    );
  }

  try {
    await db.deposits.create({
      data: {
        amount,
        transaction_id: transactionId,
        gateway: {
          connect: {
            id: gatewayId,
          },
        },
        walletNumber: walletNumber,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    await createLog(user!.id, {
      amount,
      title: "Deposit Request",
      des: "Your Deposit Request was submited.",
      log_type: "DEPOSIT",
    });

    return Response.json(
      { message: "Deposit request was submited", success: true },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { message: "Unknown Error Try agin", success: false },
      { status: 500 }
    );
  }
};
