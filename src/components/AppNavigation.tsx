import { AppWindowMac } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppNavigation = () => {
  return (
    <Link
      href="/"
      className="fixed bottom-16 right-8 w-12 h-12 flex items-center justify-center rounded-full shadow-sm bg-primary border border-border  text-white"
    >
      <AppWindowMac className="w-4 h-4" />
    </Link>
  );
};

export default AppNavigation;
