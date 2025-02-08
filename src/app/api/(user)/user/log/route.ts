import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { LogType } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const logTypeAny = new URL(req.url).searchParams.get("log-type") as
      | LogType
      | "ALL";
    const LogType = logTypeAny as LogType;
    const user = await getCurrentUser();
    let logs;

    if (logTypeAny === "ALL") {
      logs = await db.log.findMany({
        where: {
          user_id: user!.id,
        },
        orderBy : {
          createdAt : "desc"
        }
      });
    } else {
      logs = await db.log.findMany({
        where: {
          user_id: user!.id,
          log_type: LogType,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return Response.json(
      { message: "Logs Fetched", success: true, payload: logs },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { message: "Unknown Error Try agin", success: false },
      { status: 500 }
    );
  }
};

export const PUT = async () => {
  try {
    const user = await getCurrentUser();
    await db.log.updateMany({
      where: {
        user_id: user!.id,
        visited: false,
      },
      data: {
        visited: true,
      },
    });

    return Response.json(
      { message: "Updated", success: true },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { message: "Unknown Error Try aginn", success: false },
      { status: 500 }
    );
  }
};
