"use client"; // Required in Next.js 13+ when using window object

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

interface CelebrationProps {
  isWinning: boolean;
}

const Celebration: React.FC<CelebrationProps> = ({ isWinning }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Confetti
      className={cn(
        "transition-all opacity-50",
        `${isWinning ? "block opacity-100" : "hidden opacity-0"} `
      )}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default Celebration;
