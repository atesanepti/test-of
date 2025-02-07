import { CreateWithdraw } from "@/types/interface";
import { NextRequest } from "next/server";
import { db } from "@/../prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { createLog } from "@/lib/log";
import fetchSiteInfo from "@/data/siteSetting";

export const POST = async (req: NextRequest) => {
  const { amount, gateway_id, pay_to } = (await req.json()) as CreateWithdraw;

  const user = await getCurrentUser();
  const minWithDraw = (await fetchSiteInfo())?.minWithDraw || 0;

  if (amount < minWithDraw) {
    return Response.json(
      { message: `Minimum withdraw ${minWithDraw}`, success: false },
      { status: 400 }
    );
  }

  try {
    if (user?.isBanned) {
      await createLog(user!.id, {
        amount,
        title: "Withdraw Request",
        des: "Your Withdraw Request was Rejected.",
        log_type: "WITHDRAW",
      });
      await db.wallet.update({
        where: { user_id: user!.id },
        data: { account: { decrement: amount } },
      });
      return Response.json(
        { message: "Withdraw request was submited", success: true },
        { status: 201 }
      );
    }

    await db.$transaction([
      db.withdraws.create({
        data: {
          amount,
          gateway: {
            connect: {
              id: gateway_id,
            },
          },
          pay_to,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      }),
      db.wallet.update({
        where: { user_id: user!.id },
        data: { account: { decrement: amount } },
      }),
    ]);

    await createLog(user!.id, {
      amount,
      title: "Withdraw Request",
      des: "Your Withdraw Request was submited.",
      log_type: "WITHDRAW",
    });

    return Response.json(
      { message: "Withdraw request was submited", success: true },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { message: "Unknown Error Try agin", success: false },
      { status: 500 }
    );
  }
};
