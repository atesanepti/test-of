import { db } from "@/lib/prisma";
import fetchSiteInfo from "@/data/siteSetting";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { createLog } from "@/lib/log";
import { UpdateDepositStatus } from "@/types/interface";
import { DepositsStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { status } = (await req.json()) as UpdateDepositStatus;

  const { id } = await params;
  const user = await getCurrentUser();
  const depositReq = await db.deposits.findUnique({
    where: {
      id,
    },
  });

  if (!depositReq) {
    return Response.json(
      { message: "Deposit was not found", success: false },
      { status: 404 }
    );
  }

  try {
    const newDeposit = await db.deposits.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        user: true,
      },
    });

    if (status === DepositsStatus.ACCEPTED) {
      await db.wallet.update({
        where: {
          user_id: newDeposit.user.id,
        },
        data: {
          account: {
            increment: newDeposit.amount,
          },
        },
      });

      await createLog(depositReq.user_id, {
        amount: depositReq!.amount!,
        title: "Deposit Successfull",
        des: "Your Deposit Request was Accepted. Check your Gaming wallet",
        log_type: "DEPOSIT",
      });

      const isFirstDeposit =
        (await db.deposits.count({ where: { user_id: user!.id } })) <= 1;

      if (isFirstDeposit) {
        const bounsPercent = (await fetchSiteInfo())?.depositBounsPercent || 0;
        const bonus = (bounsPercent / 100) * depositReq.amount;
        if (bonus > 0) {
          await db.bonusWallet.update({
            where: {
              id: depositReq.user_id,
            },
            data: {
              account: {
                increment: bonus,
              },
            },
          });
        }
      }
    } else if (status === DepositsStatus.REJECTED) {
      await createLog(depositReq.user_id, {
        amount: depositReq!.amount!,
        title: "Deposit Unsuccessfull",
        des: "Your Deposit Request was Rejected.",
        log_type: "DEPOSIT",
      });
    }

    return Response.json(
      { success: true, message: "Deposit Updated" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
