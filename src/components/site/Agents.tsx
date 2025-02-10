"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteAgentMutation,
  useFetchAgentsQuery,
} from "@/lib/features/api/settingApiSlice";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import AddAgent from "./AddAgent";
import toast from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import Loader from "../Loader";
import { Skeleton } from "../ui/skeleton";

const Agents = () => {
  const { data, isLoading } = useFetchAgentsQuery();
  const agents = data?.payload;

  const [agentDeleteApi, { isLoading: deleteLoading }] =
    useDeleteAgentMutation();

  const handleAgentDelete = async (id: string) => {
    agentDeleteApi({ id })
      .then((res) => {
        if (res) {
          toast.success("Agent Deleted");
        }
      })
      .catch((error: FetchQueryError) => {
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error("Unknow Error Try agin");
        }
      });
  };
  return (
    <div className="bg-primary-foreground shadow-md p-4 rounded-md md:p-5">
      <div className="flex items-center justify-between  mb-3">
        <h4 className="text-base text-white font-semibold mb-3">
          Site Permission
        </h4>

        <AddAgent>
          <button className="px-2 py-1 flex items-center gap-1 rounded-full bg-[#118B50]/15 text-[#118B50] text-xs">
            Agent <Plus className="w-3 h-3 " />
          </button>
        </AddAgent>
      </div>

      {agents && (
        <div className="relative">
          {agents.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow className="bg-primary-foreground border-b border-secondary-foreground">
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-white">
                      {a.email}
                    </TableCell>
                    <TableCell className="text-white">{a.phone}</TableCell>
                    <TableCell>
                      <Button
                        size={"sm"}
                        onClick={() => handleAgentDelete(a.id)}
                        className="bg-destructive hover:bg-destructive/90 text-white"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {agents.length == 0 && (
            <div className="w-full h-20 ">
              <span className="block text-center text-muted-foreground text-sm">
                No Agents Added
              </span>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 bg-primary" />
          <Skeleton className="h-10 bg-primary" />
          <Skeleton className="h-10 bg-primary" />
        </div>
      )}

      {deleteLoading && <Loader />}
    </div>
  );
};

export default Agents;
