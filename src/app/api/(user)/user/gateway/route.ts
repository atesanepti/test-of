import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { UserRole } from "@prisma/client";

export const GET = async () => {
  try {
    const user = await getCurrentUser();

    let gateway;

    if (user?.role === UserRole.ADMIN) {
      gateway = await db.gateway.findMany({
        where: {},
      });
    } else if (user?.role === UserRole.USER) {
      gateway = await db.gateway.findMany({
        where: {
          isActive: true,
        },
      });
    }
    gateway?.sort((a,b)=> a.method.localeCompare(b.method))
    console.log({gateway})
    return Response.json(
      {
        success: true,
        message: "Getway information fetched",
        payload: gateway,
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
