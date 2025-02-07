import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import User from "@/components/users/User";

const UserPage = () => {
  return (
    <div className="px-2">
      <HomeHeader />
      <div className="container py-6">
        <User />
      </div>
    </div>
  );
};

export default UserPage;
