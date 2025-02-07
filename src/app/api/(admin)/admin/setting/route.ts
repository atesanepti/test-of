import { db } from "@/../prisma/index";
import { SiteSettingInput } from "@/types/interface";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const setting = await db.siteSetting.findFirst({
      where: {},
    });

    if (!setting) {
      const setting = await db.siteSetting.create({
        data: {
          referBonus: 0,
          depositBounsPercent: 0,
          minDeposit: 500,
          minWithDraw: 1000,
        },
      });
      return Response.json(
        { success: true, message: "Setting Fetched", payload: setting },
        { status: 200 }
      );
    }

    return Response.json(
      { success: true, message: "Setting Fetched", payload: setting },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  const { referBonus, depositBonusPercent, minDeposit, minWithdraw } =
    (await req.json()) as SiteSettingInput;

  try {
    const setting = await db.siteSetting.findFirst({
      where: {},
    });

    if (setting) {
      const payload: Prisma.siteSettingUpdateInput = {};
      if (referBonus) {
        payload.referBonus = referBonus;
      }
      if (depositBonusPercent) {
        payload.depositBounsPercent = depositBonusPercent;
      }
      if (minDeposit) {
        payload.minDeposit = minDeposit;
      }
      if (minWithdraw) {
        payload.minWithDraw = minWithdraw;
      }
      await db.siteSetting.update({
        where: {
          id: setting!.id,
        },
        data: payload,
      });

      return Response.json(
        { success: true, message: "Setting Updated" },
        { status: 200 }
      );
    }

    const payload: Prisma.siteSettingCreateInput = {
      referBonus: 0,
      depositBounsPercent: 0,
      minDeposit: 0,
      minWithDraw: 0,
    };

    if (referBonus) {
      payload.referBonus = referBonus;
    }
    if (depositBonusPercent) {
      payload.depositBounsPercent = depositBonusPercent;
    }

    await db.siteSetting.create({
      data: payload,
    });

    return Response.json(
      { success: true, message: "Setting Updated" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
