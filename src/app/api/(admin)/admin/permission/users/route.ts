import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { db } from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";

    const query: Prisma.usersWhereInput = {};

    if (query) {
      query.OR = [
        {
          email: {
            equals: search,
          },
        },
        {
          phone: {
            equals: search,
          },
        },
      ];
    }

    const users = await db.users.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return Response.json(
      { success: true, message: "Users Fetched", payload: users },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
