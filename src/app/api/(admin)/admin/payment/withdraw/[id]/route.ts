import { db } from "@/../prisma/index";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { createLog } from "@/lib/log";
import { UpdateWithdrawStatus } from "@/types/interface";
import { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { status } = (await req.json()) as UpdateWithdrawStatus;

  const { id } = await params;
  const user = await getCurrentUser();

  const withdrawReq = await db.withdraws.findUnique({
    where: {
      id,
    },
  });

  if (!req) {
    return Response.json(
      { success: false, message: "Data not found" },
      { status: 404 }
    );
  }

  try {
    await db.withdraws.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        user: true,
      },
    });

    if (status == "ACCEPTED") {
      await createLog(user!.id, {
        amount: withdrawReq!.amount!,
        title: "Withdraw Successfull",
        des: "Your withdraw Request was Accepted. Check your wallet",
        log_type: "WITHDRAW",
      });
    } else if (status == "REJECTED") {
      await createLog(user!.id, {
        amount: withdrawReq!.amount!,
        title: "Withdraw Unsuccessfull",
        des: "Your withdraw Request was Rejected.",
        log_type: "WITHDRAW",
      });
    }

    return Response.json(
      { success: true, message: "Withdraw  Updated" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
