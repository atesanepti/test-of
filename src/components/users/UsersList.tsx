"use client";
import { Prisma } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Pagination from "../Pagination";
import { useUsersFilter } from "@/lib/store";

interface UserListProps {
  users: Prisma.usersGetPayload<object>[];
  totalUsers: number;
}

const UsersList = ({ users, totalUsers }: UserListProps) => {
  const { page, setPage } = useUsersFilter((state) => state);

  return (
    <div className="my-8">
      <Table>
        <TableCaption>A list users.</TableCaption>
        <TableHeader>
          <TableRow className="bg-primary-foreground">
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium text-white">
                {user.email}
              </TableCell>
              <TableCell className="font-medium text-white">
                {user.phone}
              </TableCell>
              <TableCell
                className={`${
                  user.isBanned ? "text-destructive" : "text-emerald-600"
                }`}
              >
                {user.isBanned ? "Banned" : "Active"}
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/users/${user.id}`}
                  className="bg-brand text-xs hover:bg-brand/90 px-4 py-2 rounded-sm cursor-pointer"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalUsers > 10 && (
        <Pagination
          currentPage={page}
          totalFound={totalUsers}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
};

export default UsersList;
