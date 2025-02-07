import { db } from "@/../prisma";

export const GET = async () => {
  try {
    const agents = await db.users.findMany({
      where: {
        role: "AGENT",
      },
    });

    return Response.json(
      {
        success: true,
        message: "Agents Fetch",
        payload: agents,
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

