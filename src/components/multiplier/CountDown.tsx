import React from "react";

const CountDown = ({ countDown }: { countDown: number }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="text-4xl font-bold text-white font-oswald">
        {countDown}
      </div>
    </div>
  );
};

export default CountDown;
