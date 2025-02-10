import { db } from "@/lib/prisma";


export const GET = async () => {
  try {
    const existinInfo = await db.info.findFirst({
      where: {},
    });

    if (!existinInfo) {
      const newInfo = await db.info.create({
        data: {
          message: "",
        },
      });
      return Response.json(
        { success: true, message: "Info Updated", payload: newInfo },
        { status: 200 }
      );
    }

    return Response.json(
      { success: true, message: "Info Updated", payload: existinInfo },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
