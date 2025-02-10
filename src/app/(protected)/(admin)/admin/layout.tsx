import React from "react";
import AppNavigation from "@/components/AppNavigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppNavigation />
      {children}
    </div>
  );
};

export default AdminLayout;
