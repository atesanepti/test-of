import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-10 h-screen bg-black/50 flex justify-center items-center">
      <ClipLoader size={20} color="white" />
    </div>
  );
};

export default Loader;
