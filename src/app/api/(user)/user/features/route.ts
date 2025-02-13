import { db } from "@/lib/prisma";

export const GET = async () => {
  try {
    const featureImages = await db.featuresImages.findFirst({
      where: {},
    });

    if (!featureImages) {
      const newFeatureImages = await db.featuresImages.create({
        data: { images: [] },
      });
      return Response.json(
        { message: "Fetched", success: true, payload: newFeatureImages },
        { status: 200 }
      );
    }

    return Response.json(
      { message: "Fetched", success: true, payload: featureImages },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
