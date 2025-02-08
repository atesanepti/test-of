import { db } from "@/lib/prisma";

export const GET = async () => {
  try {
    const totalUsers = await db.users.count({ where: {} });
    console.log("1. totalUsers", totalUsers);
    const totalDespositsAmount = await db.deposits.count({
      where: {
        status: "ACCEPTED",
      },
    });
    console.log("2. totalDespositsAmount", totalDespositsAmount);
    const avgDespositsAmount = await db.deposits.aggregate({
      where: {
        status: "ACCEPTED",
      },
      _avg: {
        amount: true,
      },
    });
    console.log("3. avgDespositsAmount", avgDespositsAmount);
    const totalWithdrawAmount = await db.withdraws.count({
      where: {
        status: "ACCEPTED",
      },
    });
    console.log("4. totalWithdrawAmount", totalWithdrawAmount);
    const avgWithdrawAmount = await db.withdraws.aggregate({
      where: {
        status: "ACCEPTED",
      },
      _avg: {
        amount: true,
      },
    });
    console.log("5. avgWithdrawAmount", avgWithdrawAmount);
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
    console.log("6. currentDespositAmount", currentDespositAmount);
    const netRevenue = totalWithdrawAmount - totalDespositsAmount;
    console.log("7. netRevenue", netRevenue);
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
    console.log("Sta Error Of ser ", error);
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
