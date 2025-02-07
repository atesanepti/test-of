import React from "react";

import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/90 flex items-center justify-center z-[10]">
      <div className="flex justify-center flex-col items-center">
        <RingLoader size={40} color="white" />
        <span className="text-sm text-white mt-2">Connecting...</span>
      </div>
    </div>
  );
};

export default Loader;
