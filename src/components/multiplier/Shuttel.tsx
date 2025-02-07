"use client";
import React, { useEffect, useState } from "react";

const Shuttel = () => {
  const [isBroken, setIsBroken] = useState(false);

  useEffect(() => {
    // Set a timeout to break the rocket after 5 seconds
    const timer = setTimeout(() => {
      setIsBroken(true);
    }, 2000); // Time delay before the rocket breaks (5 seconds)

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="absolute left-0 bottom-0 w-full h-full ">
      <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <g className={`rocket`}>
          {/* Rocket Body */}
          <ellipse
            cx="100"
            cy="80"
            rx="30"
            ry="50"
            fill="#ddd"
            stroke="#bbb"
            strokeWidth="2"
          />
          <rect
            x="85"
            y="100"
            width="30"
            height="80"
            fill="#999"
            stroke="#777"
            strokeWidth="2"
          />
          <polygon points="85,180 115,180 100,210" fill="red" />
          <circle
            cx="100"
            cy="70"
            r="8"
            fill="#00aaff"
            stroke="#0077cc"
            strokeWidth="2"
          />
          {/* Rocket Fins */}
          <polygon points="70,120 85,150 85,180 55,160" fill="#666" />
          <polygon points="130,120 115,150 115,180 145,160" fill="#666" />
          {/* Rocket Flames */}
          <polygon
            className={`${!isBroken && "flames"}`}
            points="90,180 110,180 100,220"
            fill="orange"
          />
          <polygon
            className={`${!isBroken && "flames"}`}
            points="92,185 108,185 100,215"
            fill="yellow"
          />
          {/* Rocket Smoke */}
          <circle
            className={`${!isBroken && "smoke"}`}
            cx="100"
            cy="230"
            r="10"
            fill="lightgray"
          />
          <circle
            className={`${!isBroken && "smoke"}`}
            cx="95"
            cy="240"
            r="12"
            fill="lightgray"
          />
          <circle
            className={`${!isBroken && "smoke"}`}
            cx="105"
            cy="250"
            r="14"
            fill="lightgray"
          />
        </g>
      </svg>
    </div>
  );
};

export default Shuttel;
