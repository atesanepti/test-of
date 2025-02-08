"use client";
import Autoplay from "embla-carousel-autoplay";
import silder_1 from "@/../public/assets/slider-1.png";
// import silder_2 from "@/../public/assets/slider-2.png";
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
    <div className="my-10 ">
      <span>Hello world</span>
      <Carousel
        plugins={[plugin.current]}
        className="w-full "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Image
                  src={silder_1}
                  placeholder="blur"
                  alt="slider"
                  className="w-full aspect-[10/4] rounded-lg object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FeaturesSlider;
