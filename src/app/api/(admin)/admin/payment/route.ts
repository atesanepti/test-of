import { db } from "@/lib/prisma";
import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";

export const GET = async () => {
  try {
    const currentDate = new Date();

    // Generate last 6 months range
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(currentDate, 5 - i);
      return {
        month: format(date, "MMMM"), // "January", "February", etc.
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
    });

    // Fetch withdrawals for the last 6 months
    const withdrawals = await db.withdraws.findMany({
      where: {
        createdAt: {
          gte: lastSixMonths[0].start, // Start of the oldest month
        },
        status: "ACCEPTED",
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    const deposits = await db.deposits.findMany({
      where: {
        createdAt: {
          gte: lastSixMonths[0].start,
        },
        status: "ACCEPTED",
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    const result = lastSixMonths.reduce<
      Record<string, { deposits: number; withdrawals: number }>
    >((acc, { month }) => {
      acc[month] = { deposits: 0, withdrawals: 0 };
      return acc;
    }, {});

    // Group withdrawals by month
    withdrawals.forEach(({ amount, createdAt }) => {
      const monthName = format(createdAt, "MMMM");
      if (result[monthName]) {
        result[monthName].withdrawals += amount;
      }
    });
    deposits.forEach(({ amount, createdAt }) => {
      const monthName = format(createdAt, "MMMM");
      if (result[monthName]) {
        result[monthName].deposits += amount;
      }
    });

    console.log({result})

    return Response.json(
      {
        success: true,
        message: "Fetched",
        payload: result,
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
