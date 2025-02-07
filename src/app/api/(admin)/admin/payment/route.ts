import { db } from "@/../prisma";
import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";

export const GET = async () => {
  try {
    const now = new Date();
    const startDate = startOfMonth(subMonths(now, 5)); // 6 months ago (including current month)
    const endDate = endOfMonth(now); // End of the current month

    // Fetch deposits data
    const depositsData = await db.deposits.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: "ACCEPTED",
      },
      _count: {
        _all: true, // Count occurrences per month
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Fetch withdrawals data
    const withdrawalsData = await db.withdraws.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: "ACCEPTED",
      },
      _count: {
        _all: true, // Count occurrences per month
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Generate an array of last 6 months
    const months = Array.from({ length: 6 }).map((_, i) => {
      return format(subMonths(now, 5 - i), "MMMM"); // Example: "September", "October", etc.
    });

    // Convert fetched data into month-wise objects
    const depositsMonthlyStats = depositsData.reduce((acc, item) => {
      const month = format(new Date(item.createdAt), "MMMM");
      acc[month] = item._count._all;
      return acc;
    }, {} as Record<string, number>);

    const withdrawMonthlyStats = withdrawalsData.reduce((acc, item) => {
      const month = format(new Date(item.createdAt), "MMMM");
      acc[month] = item._count._all;
      return acc;
    }, {} as Record<string, number>);

    // Merge both datasets, ensuring every month is present
    const allMonthlyStats = months.reduce((acc, month) => {
      acc[month] = {
        deposits: depositsMonthlyStats[month] || 0,
        withdrawals: withdrawMonthlyStats[month] || 0,
      };
      return acc;
    }, {} as Record<string, { deposits: number; withdrawals: number }>);

    return Response.json(
      {
        success: true,
        message: "Fetched",
        payload: allMonthlyStats,
      },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
