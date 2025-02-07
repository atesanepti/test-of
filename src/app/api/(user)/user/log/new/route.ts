import { getCurrentUser } from "@/lib/getCurrentUser";
import { db } from "../../../../../../../prisma";

export const GET = async () => {
  try {
    const user = await getCurrentUser();
    const unSeenLogs = await db.log.count({
      where: {
        user_id: user!.id,
        visited: false,
      },
    });

    return Response.json(
      { message: "Fetched", success: true, payload: { unSeenLogs } },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { message: "Unknown Error Try agin", success: false },
      { status: 500 }
    );
  }
};
