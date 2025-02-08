import { db } from "@/../prisma";
import { ContactInfoCreate } from "@/types/interface";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const newContact = (await req.json()) as ContactInfoCreate;

    const contact = await db.contact.findFirst({
      where: {},
    });

    if (!contact) {
      await db.contact.create({
        data: newContact,
      });

      return Response.json(
        { success: true, message: "Created" },
        { status: 201 }
      );
    }
    await db.contact.update({
      where: {
        id: contact.id,
      },
      data: newContact,
    });
    return Response.json(
      {
        message: "Fetched",
        success: true,
        payload: contact,
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
