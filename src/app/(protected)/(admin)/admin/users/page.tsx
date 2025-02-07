import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import Users from "@/components/users/Users";

const UsersPage = () => {
  return (
    <div className="px-2">
      <HomeHeader />
      <div className="container py-6">
        <Users />
      </div>
    </div>
  );
};

export default UsersPage;
