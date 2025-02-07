"use client";
import { useFetchUsersQuery } from "@/lib/features/api/usersApiSlice";
import { useUsersFilter } from "@/lib/store";
import React from "react";
import UserStatistics from "./UserStatistics";
import UsersList from "./UsersList";
import UserSearch from "./UserSearch";
import { Skeleton } from "../ui/skeleton";

const Users = () => {
  const { page, search, status } = useUsersFilter((state) => state);

  const { data, isLoading } = useFetchUsersQuery({
    page: page,
    search,
    status,
  });

  const payload = data?.payload;

  return (
    <>
      {payload && (
        <>
          <UserStatistics
            statistics={{
              totalUser: payload!.totalFound,
              activeUsers: payload!.totalActiveUsersCount,
              bannedUsers: payload!.totalBannedUsersCount,
            }}
          />
          <UserSearch />

          <UsersList users={payload!.users} totalUsers={payload.totalFound} />
        </>
      )}

      {isLoading && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
          <Skeleton className="h-8 mb-2" />
          <div className="flex flex-col gap-3 mt-5">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
