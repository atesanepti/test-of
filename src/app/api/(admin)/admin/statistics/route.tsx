import { db } from "@/../prisma";

export const GET = async () => {
  try {
    const totalUsers = await db.users.count({ where: {} });
    const totalDespositsAmount = await db.deposits.count({
      where: {
        status: "ACCEPTED",
      },
    });

    const avgDespositsAmount = await db.deposits.aggregate({
      where: {
        status: "ACCEPTED",
      },
      _avg: {
        amount: true,
      },
    });

    const totalWithdrawAmount = await db.withdraws.count({
      where: {
        status: "ACCEPTED",
      },
    });

    const avgWithdrawAmount = await db.withdraws.aggregate({
      where: {
        status: "ACCEPTED",
      },
      _avg: {
        amount: true,
      },
    });

    const currentDespositAmount = await db.wallet.aggregate({
      where: {
        user: {
          isBanned: false,
        },
      },
      _sum: {
        account: true,
      },
    });

    const netRevenue = totalWithdrawAmount - totalDespositsAmount;

    return Response.json(
      {
        success: true,
        message: "Fetched",
        payload: {
          totalUsers,
          totalDespositsAmount,
          avgDespositsAmount: avgDespositsAmount._avg.amount,
          totalWithdrawAmount,
          avgWithdrawAmount: avgWithdrawAmount._avg.amount,
          currentDespositAmount: currentDespositAmount._sum.account,
          netRevenue,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Sta Error Of ser ", error)
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
