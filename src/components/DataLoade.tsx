import React from "react";
import { MoonLoader } from "react-spinners";

const DataLoader = () => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-primary z-20 flex justify-center items-center">
      <MoonLoader size={20} color="white" />
    </div>
  );
};

export default DataLoader;
