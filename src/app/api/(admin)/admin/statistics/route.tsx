import { db } from "@/lib/prisma";

export const GET = async () => {
  try {
    const totalUsers = await db.users.count({ where: {} });
    const totalDespositsAmount =
      (
        await db.deposits.aggregate({
          where: {
            status: "ACCEPTED",
          },
          _sum: {
            amount: true,
          },
        })
      )._sum.amount || 0;
    const avgDespositsAmount =
      (
        await db.deposits.aggregate({
          where: {
            status: "ACCEPTED",
          },
          _avg: {
            amount: true,
          },
        })
      )._avg.amount || 0;
    const totalWithdrawAmount =
      (
        await db.withdraws.aggregate({
          where: {
            status: "ACCEPTED",
          },
          _sum: {
            amount: true,
          },
        })
      )._sum.amount || 0;
    const avgWithdrawAmount =
      (
        await db.withdraws.aggregate({
          where: {
            status: "ACCEPTED",
          },
          _avg: {
            amount: true,
          },
        })
      )._avg.amount || 0;
    const currentDespositAmount =
      (
        await db.wallet.aggregate({
          where: {
            user: {
              isBanned: false,
            },
          },
          _sum: {
            account: true,
          },
        })
      )._sum.account || 0;

    const netRevenue = totalDespositsAmount - currentDespositAmount - totalWithdrawAmount;

    return Response.json(
      {
        success: true,
        message: "Fetched",
        payload: {
          totalUsers,
          totalDespositsAmount,
          avgDespositsAmount: avgDespositsAmount,
          totalWithdrawAmount,
          avgWithdrawAmount: avgWithdrawAmount,
          currentDespositAmount: currentDespositAmount,
          netRevenue,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Sta Error Of ser ", error);
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
