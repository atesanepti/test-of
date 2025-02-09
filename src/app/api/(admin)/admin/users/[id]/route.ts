import { NextRequest } from "next/server";
import { db } from "@/lib/prisma";
import { UserUpdateInput } from "@/types/interface";
import { createLog } from "@/lib/log";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  try {
    const user = await db.users.findUnique({
      where: {
        id,
      },
      include: {
        wallet: true,
        bonus: true,
      },
    });

    if (!user) {
      return Response.json(
        { success: false, message: "User Not Found" },
        { status: 404 }
      );
    }

    const totalDepositsAmount =
      (
        await db.deposits.aggregate({
          where: {
            user_id: id,
            status: "ACCEPTED",
          },

          _sum: {
            amount: true,
          },
        })
      )._sum.amount || 0;

    const totalWithdrawsAmount =
      (
        await db.withdraws.aggregate({
          where: {
            user_id: id,
            status: "ACCEPTED",
          },

          _sum: {
            amount: true,
          },
        })
      )._sum.amount || 0;

    const wallet = await db.wallet.findUnique({
      where: {
        user_id : id
      },
    });

    const profit = totalWithdrawsAmount + wallet!.account! - totalDepositsAmount

    return Response.json(
      {
        success: true,
        message: "Fetched",
        payload: {
          user,
          profit,
          currentWallet: wallet?.account,
          totalWithdrawsAmount: totalWithdrawsAmount,
          totalDepositsAmount: totalDepositsAmount,
        },
      },
      { status: 200 }
    );
  } catch (error){
    console.log({error})
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const { ban, walletTransfer } = (await req.json()) as UserUpdateInput;
  try {
    if (ban) {
      await db.users.update({
        where: {
          id,
        },
        data: {
          isBanned: ban.status == "BAN" ? true : false,
        },
      });
    }

    if (walletTransfer) {
      const bonusAmount = (
        await db.bonusWallet.findUnique({
          where: {
            user_id: id,
          },
        })
      )?.account;
      await db.$transaction([
        db.users.update({
          where: {
            id,
          },
          data: {
            wallet: {
              update: {
                account: {
                  increment: bonusAmount,
                },
              },
            },
          },
        }),
        db.bonusWallet.update({
          where: {
            user_id: id,
          },
          data: {
            account: 0,
          },
        }),
      ]);

      await createLog(id, {
        title: "Bonus Money Added",
        des: `${bonusAmount} BDT Successfully added on your main wallet`,
        log_type: "DEPOSIT",
        amount: bonusAmount!,
      });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
