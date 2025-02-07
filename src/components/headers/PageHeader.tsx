"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const PageHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="bg-primary border-b border-b-border px-3 py-5 flex items-center gap-2">
      <button onClick={handleBack}>
        <ArrowLeft className="w-5 h-5 text-white " />
      </button>
      <span className="text-base font-medium text-white">{title}</span>
    </div>
  );
};

export default PageHeader;
