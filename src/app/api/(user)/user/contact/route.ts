import { db } from "@/lib/prisma";

export const GET = async () => {
  try {
    const contact = await db.contact.findFirst({
      where: {},
    });

    return Response.json(
      {
        message: "Fetched",
        success: true,
        payload: contact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR X", error);
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
