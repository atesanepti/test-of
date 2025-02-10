import { db } from "@/lib/prisma";
import { SiteInfoInput } from "@/types/interface";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const { message } = (await req.json()) as SiteInfoInput;

    const existinInfo = await db.info.findFirst({
      where: {},
    });

    await db.info.update({
      where: {
        id: existinInfo!.id,
      },
      data: {
        message,
      },
    });

    return Response.json(
      { success: true, message: "Info Updated" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
