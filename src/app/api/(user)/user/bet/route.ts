import { getCurrentUser } from "@/lib/getCurrentUser";
import { BetUpdateInput } from "@/types/interface";
import { NextRequest } from "next/server";
import { db } from "@/../prisma";

export const PUT = async (req: NextRequest) => {
  const { operation, amount, accountType } =
    (await req.json()) as BetUpdateInput;

  const user = await getCurrentUser();
  if (accountType == "MAIN" || accountType == undefined) {
    const wallet = await db.wallet.findUnique({
      where: {
        user_id: user!.id,
      },
    });

    if (operation === "DECREMENT") {
      if (amount > wallet!.account) {
        return Response.json({}, { status: 200 });
      }

      await db.wallet.update({
        where: {
          user_id: user!.id,
        },
        data: {
          account: {
            decrement: amount,
          },
        },
      });
    } else if (operation === "INCREMENT") {
      await db.wallet.update({
        where: {
          user_id: user!.id,
        },
        data: {
          account: {
            increment: amount,
          },
        },
      });
    }
  } else if (accountType == "BONUS") {
    const wallet = await db.bonusWallet.findUnique({
      where: {
        user_id: user!.id,
      },
    });

    if (operation === "DECREMENT") {
      if (amount > wallet!.account) {
        return Response.json({}, { status: 200 });
      }

      await db.bonusWallet.update({
        where: {
          user_id: user!.id,
        },
        data: {
          account: {
            decrement: amount,
          },
        },
      });
    } else if (operation === "INCREMENT") {
      await db.bonusWallet.update({
        where: {
          user_id: user!.id,
        },
        data: {
          account: {
            increment: amount,
          },
        },
      });
    }
  }
  return Response.json(
    { message: "Wallet updated", success: true },
    { status: 200 }
  );
};
