import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-[2px] h-3 bg-brand  rounded-md"></div>
      <h3 className="text-white text-base mb-2 font-medium">{title}</h3>
    </div>
  );
};

export default Title;
