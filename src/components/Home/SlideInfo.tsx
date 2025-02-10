"use client";
import { useFetchSiteInfoQuery } from "@/lib/features/api/sitInfoApiSlice";
import { BadgeHelp } from "lucide-react";
import React from "react";

const SlideInfo = () => {
  const { data, isLoading } = useFetchSiteInfoQuery();
  const info = data?.payload;
  return (
    <>
      {info && info.message && (
        <div className="my-8 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex items-center gap-2 flex-nowrap">
            <div className="bg-blue-600 min-w-8 h-7 flex items-center justify-center">
              <BadgeHelp className="text-white w-4 h-4" />
            </div>

            <p className="flex-shrink-0 text-xs text-white">{info.message}</p>
          </div>
        </div>
      )}

      {isLoading && !data && <div className="w-full h-16"></div>}
    </>
  );
};

export default SlideInfo;
