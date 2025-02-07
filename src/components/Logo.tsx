import React from "react";

import Image from "next/image";
import logo from "@/../public/assets/logo.png";

const Logo = () => {
  return (
    <Image
      src={logo}
     
      alt="Casino Ciry 247"
      className="w-28"
      placeholder="blur"
    />
  );
};

export default Logo;
