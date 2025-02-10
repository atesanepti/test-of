"use client";
import Autoplay from "embla-carousel-autoplay";
import silder_1 from "@/../public/assets/slider-1.png";
import silder_2 from "@/../public/assets/slider-2.jpg";
import silder_3 from "@/../public/assets/slider-3.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useRef } from "react";
import Image from "next/image";

const FeaturesSlider = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="mt-6 mb-12 ">
      <Carousel
        plugins={[plugin.current]}
        className="w-full "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="p-1">
              <Image
                src={silder_1}
                placeholder="blur"
                alt="slider"
                className="w-full aspect-[10/4] rounded-lg object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Image
                src={silder_2}
                placeholder="blur"
                alt="slider"
                className="w-full aspect-[10/4] rounded-lg object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Image
                src={silder_3}
                placeholder="blur"
                alt="slider"
                className="w-full aspect-[10/4] rounded-lg object-cover"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FeaturesSlider;
