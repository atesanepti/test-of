import { UserStatus } from "@/types/enum";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { db } from "@/../prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") || 1;
  const search = url.searchParams.get("search") || "";
  const status = (url.searchParams.get("status") as UserStatus) || "";
  const limit = 10;
  const query: Prisma.usersWhereInput = {};

  const user = await getCurrentUser();

  if (search) {
    query.OR = [
      {
        email: {
          contains: search,
        },
      },
      {
        phone: {
          contains: search,
        },
      },
    ];
  }

  if (status) {
    query.isBanned = status === UserStatus.ACTIVE ? false : true;
  }

  try {
    const users = await db.users.findMany({
      where: { ...query, role: { not: "ADMIN" } },
      include: {
        wallet: true,
        bonus: true,
      },
      take: limit,
      skip: limit * (+page! - 1),
    });

    const totalFound = await db.users.count({
      where: {},
    });

    const totalActiveUsersCount = await db.users.count({
      where: {
        isBanned: false,
      },
    });

    const totalBannedUsersCount = await db.users.count({
      where: {
        isBanned: true,
      },
    });

    const totalDepositsAmount = (
      await db.deposits.aggregate({
        where: {
          user_id: user!.id,
          status: "ACCEPTED",
        },

        _sum: {
          amount: true,
        },
      })
    )._sum.amount;

    const totalWithdrawsAmount = (
      await db.withdraws.aggregate({
        where: {
          user_id: user!.id,
          status: "ACCEPTED",
        },

        _sum: {
          amount: true,
        },
      })
    )._sum.amount;

    return Response.json({
      sucess: false,
      message: "Fetched",
      payload: {
        users,
        totalFound,
        totalDepositsAmount,
        totalWithdrawsAmount,
        totalActiveUsersCount,
        totalBannedUsersCount,
      },
    });
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
