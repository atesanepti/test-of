import { db } from "@/lib/prisma";
import { getPublicId } from "@/lib/utils";
import { FeaturesImagesInput } from "@/types/interface";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const { image, reduce } = (await req.json()) as FeaturesImagesInput;

    const featureImages = await db.featuresImages.findFirst({
      where: {},
    });

    if (reduce) {
      const publicId = getPublicId(reduce);

      const newImage = [
        ...featureImages!.images.filter((image) => {
          const currentImagePublicId = getPublicId(image);
          return currentImagePublicId !== publicId;
        }),
        image,
      ];

      await db.featuresImages.update({
        where: {
          id: featureImages!.id,
        },
        data: {
          images: newImage,
        },
      });

      return Response.json(
        { message: "Updated", success: true },
        { status: 200 }
      );
    }

    await db.featuresImages.update({
      where: {
        id: featureImages!.id,
      },
      data: {
        images: {
          push: image,
        },
      },
    });

    return Response.json(
      { message: "Updated", success: true },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: false, message: "Unknown Error Try agin" },
      { status: 500 }
    );
  }
};
