"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { getPublicId } from "@/lib/utils";
import {
  useUpdateFeatureImageMutation,
  useFetchFeatureImageQuery,
} from "@/lib/features/api/featuresImageApiSlice";
import { FetchQueryError } from "@/types/interface";
import Image from "next/image";
import { SquareLoader, MoonLoader } from "react-spinners";
const FeaturesImages = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState(false);

  const [uploadImageApi] = useUpdateFeatureImageMutation();

  const { data: featuresImages, isLoading } = useFetchFeatureImageQuery();
  const deleteImage = async (imageUrl: string) => {
    try {
      const publicId = getPublicId(imageUrl);
      const response = await fetch("/api/sign-cloudinary", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      return await response.json();
    } catch {
      toast.success("Unknown Error Try agin");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadImage = async (file: any) => {
    if (!file) return;

    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signatureRes = await fetch("/api/sign-cloudinary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp }),
      });

      const { payload } = await signatureRes.json();
      const { signature, cloud_name, api_key } = payload;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadRes.json();

      return data.secure_url;
    } catch {
      toast.success("Unknown Error Try agin");
    }
  };

  const handleFilePicketOpen = async (reduce?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filePicker = (window as any).showOpenFilePicker;
    if (!filePicker) {
      alert("Your browser does not support the File System Access API.");
      return;
    }

    const [fileHandle] = await filePicker({
      multiple: false,
      types: [
        {
          description: "Images",
          accept: { "image/*": [".png", ".jpg", ".jpeg"] },
        },
      ],
    });

    setImageUploading(true);

    const file = await fileHandle.getFile();
    const imageUrl = await uploadImage(file);
    if (reduce) {
      await deleteImage(reduce);

      const newImages = [
        ...images.filter((image) => image != reduce),
        imageUrl,
      ];
      setImages(newImages);
    } else {
      setImages((state) => {
        console.log({ state });
        return [...state, imageUrl];
      });
    }

    uploadImageApi({ image: imageUrl, reduce: reduce || "" })
      .unwrap()
      .then((res) => {
        if (res) {
          setImageUploading(false);
        }
      })
      .catch((error: FetchQueryError) => {
        setImageUploading(false);
        if (error.data.message) {
          toast.success(error.data.message);
        } else {
          toast.success("Unknown Error Try agin");
        }
      });
  };

  useEffect(() => {
    if (featuresImages?.payload.images) {
      console.log({ featuresImages });
      setImages(featuresImages?.payload.images);
    }
  }, [featuresImages]);

  return (
    <div className="bg-primary-foreground shadow-md p-4 rounded-md md:p-5">
      <div className="flex justify-between items-center  mb-3">
        <h4 className="text-base text-white font-semibold">Features Images</h4>
        {imageUploading && <MoonLoader color="white" size={17} />}
      </div>
      <Carousel>
        <CarouselContent>
          {images.length < 3 && featuresImages && (
            <CarouselItem>
              <button
                onClick={() => handleFilePicketOpen()}
                className="w-full h-24 md:h-[150px] rounded-lg border border-muted-foreground border-dashed flex flex-col justify-center items-center"
              >
                <ImagePlus className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Upload Image
                </span>
              </button>
            </CarouselItem>
          )}
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <CarouselItem
                key={i}
                className="w-full h-24 md:h-[150px] flex items-center justify-center"
              >
                <SquareLoader color="white" size={20} />
              </CarouselItem>
            ))}
          {images.map((image, i) => (
            <CarouselItem key={i}>
              <div className="relative w-full">
                <Image
                  src={image}
                  alt="image"
                  className="w-full aspect-[10/3] object-cover"
                  width={100}
                  height={100}
                />
                <button
                  onClick={() => handleFilePicketOpen(image)}
                  className="w-6 h-6 absolute top-3 right-3 rounded-full bg-black/50 hover:bg-black/15 transition-colors cursor-pointer flex justify-center items-center"
                >
                  <ImagePlus className="w-4 h-4 text-white" />
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FeaturesImages;
