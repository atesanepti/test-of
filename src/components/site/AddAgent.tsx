"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import {
  useFetchUsersQuery,
  useMakeAgentMutation,
} from "@/lib/features/api/settingApiSlice";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import Loader from "../Loader";
import { Skeleton } from "../ui/skeleton";
interface AddAgentProps {
  children: React.ReactNode;
}
const AddAgent = ({ children }: AddAgentProps) => {
  const [search, setSearch] = useState("");

  const { data, isFetching, isLoading } = useFetchUsersQuery({ search });
  const users = data?.payload;

  const [makeAgentApi, { isLoading: makeAgentLoading }] =
    useMakeAgentMutation();

  const handleMakeAgent = (id: string) => {
    makeAgentApi({ id })
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success("Agent Added");
        }
      })
      .catch((error: FetchQueryError) => {
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error("Unknown Error Try agin");
        }
      });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Find Users</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Email or Phone"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            {users && (
              <div className="mt-3">
                {users?.map((u, i) => (
                  <div
                    className="flex items-center justify-between py-1 px-2 border-b border-b-border"
                    key={i}
                  >
                    <span className="text-xs text-white flex-1">{u.email}</span>
                    {u.role == "USER" ? (
                      <Button
                        onClick={() => handleMakeAgent(u.id)}
                        size={"sm"}
                        className="w-max"
                      >
                        Add
                      </Button>
                    ) : (
                      <Button size={"sm"} disabled className="w-max">
                        Add
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {users && users.length == 0 && !isFetching && !isLoading && (
              <span className="text-xs text-muted-foreground block text-center py-4">
                No User found
              </span>
            )}

            {isFetching && (
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {makeAgentLoading && <Loader />}
    </>
  );
};

export default AddAgent;
