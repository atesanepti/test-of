import { getCurrentUser } from "@/lib/getCurrentUser";
import { db } from "@/lib/prisma";
export const GET = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw Error;
    }

    const mainWallet = await db.wallet.findUnique({
      where: {
        user_id: user.id,
      },
    });

    const bonusWallet = await db.bonusWallet.findUnique({
      where: {
        user_id: user.id,
      },
    });

    return Response.json(
      {
        message: "Account found",
        success: true,
        payload: { mainWallet, bonusWallet },
      },
      { status: 200 }
    );
  } catch (error){
    console.log({error})
    return Response.json(
      { message: "Unknown Error Try agin", success: false },
      { status: 500 }
    );
  }
};
