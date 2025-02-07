import React from "react";

const DepositRules = ({ rules }: { rules: string[] }) => {
  return (
    <div className="py-4 ">
      <h3 className="text-sm font-medium text-white">*READ CAREFULLY</h3>
      <div className="flex flex-col gap-2">
        {rules.map((r, i) => (
          <div key={i} className="flex gap-2 items-start mt-2">
            <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center">
              <span className="text-[10px]">{i + 1}</span>
            </div>
            <span className="text-white text-xs">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositRules;
