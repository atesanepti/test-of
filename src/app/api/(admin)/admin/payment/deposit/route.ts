import { db } from "@/../prisma/index";
import { NextRequest } from "next/server";
import { DepositsStatus, PaymentMethod, Prisma } from "@prisma/client";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { DateRange } from "@/types/enum";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") || 1;
  const search = url.searchParams.get("search") || "";
  const status = (url.searchParams.get("status") as DepositsStatus) || "";
  const method = (url.searchParams.get("method") as PaymentMethod) || "";
  const date = (url.searchParams.get("date") as DateRange) || "";

  const limit = 10;

  const query: Prisma.depositsWhereInput = {};

  if (search) {
    query.OR = [
      {
        walletNumber: { contains: search },
      },
      {
        transaction_id: { equals: search },
      },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (method) {
    query.gateway = {
      method: method,
    };
  }

  if (date) {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const yesterdayStart = startOfDay(subDays(now, 1));
    const yesterdayEnd = endOfDay(subDays(now, 1));
    const last7Days = subDays(now, 7);
    const last30Days = subDays(now, 30);

    if (date === DateRange.TODAY) {
      query.createdAt = { gte: todayStart, lte: todayEnd };
    } else if (date === DateRange.YEASTERDAY) {
      query.createdAt = { gte: yesterdayStart, lte: yesterdayEnd };
    } else if (date === DateRange.LAST7DAYS) {
      query.createdAt = {
        gte: last7Days,
      };
    } else if (date === DateRange.LAST30DAYS) {
      query.createdAt = {
        gte: last30Days,
      };
    }
  }

  try {
    const deposits = await db.deposits.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: limit * (+page! - 1),
      include: {
        gateway: true,
        user: true,
      },
    });

    const totalFound = await db.deposits.count({ where: {} });
    return Response.json(
      {
        success: true,
        message: "Deposits Fetched",
        payload: { totalFound: totalFound, deposits },
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
