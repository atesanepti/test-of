"use client";
import Autoplay from "embla-carousel-autoplay";
// import silder_1 from "@/../public/assets/slider-1.png";
// import silder_2 from "@/../public/assets/slider-2.jpg";
// import silder_3 from "@/../public/assets/slider-3.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useRef } from "react";
import Image from "next/image";
import { useFetchFeatureImageQuery } from "@/lib/features/api/featuresImageApiSlice";
import { Skeleton } from "../ui/skeleton";
import { getBlurredCloudinaryURL } from "@/lib/utils";

const FeaturesSlider = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const { data: featureImages, isLoading } = useFetchFeatureImageQuery();
  const images = featureImages?.payload?.images;
  return (
    <div className="mt-6 mb-12 ">
      {isLoading && <Skeleton className="w-full h-[150px] " />}

      {featureImages && (
        <Carousel
          plugins={[plugin.current]}
          className="w-full "
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images?.map((image, i) => (
              <CarouselItem key={i}>
                <div className="p-1">
                  <Image
                    src={image}
                    width={360}
                    height={150}
                    placeholder="blur"
                    // unoptimized
                    blurDataURL={getBlurredCloudinaryURL(image)}
                    alt="slider"
                    className="w-full aspect-[10/4] rounded-lg object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
};

export default FeaturesSlider;
