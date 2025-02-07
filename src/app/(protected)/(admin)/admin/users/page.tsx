import React from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import Users from "@/components/users/Users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | CasinoCity24",
  description: "Users List",
};

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
