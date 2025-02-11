"use client";
import { siteInfoSchema, siteSettingSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  useFetchSiteInfoQuery,
  useInfoUpdateMutation,
} from "@/lib/features/api/sitInfoApiSlice";
import toast from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import Loader from "../Loader";

const SilderInfo = () => {
  const [infoUpdateApi, { isLoading }] = useInfoUpdateMutation();
  const [infoText, setInfo] = useState("");
  const { data } = useFetchSiteInfoQuery();
  const info = data?.payload;

  const form = useForm<zod.infer<typeof siteInfoSchema>>({
    defaultValues: {
      message: info?.message || "",
    },
    resolver: zodResolver(siteSettingSchema),
  });

  const handleSaveInfo = () => {
    infoUpdateApi({ message: infoText })
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success("Info Updated");
        }
      })
      .catch((error: FetchQueryError) => {
        if (error.data.message) {
          toast.error(error.data.message);
        } else {
          toast.error("Unknown Error Try agin");
        }
      });
  };

  useEffect(() => {
    if (info?.message) {
      form.reset({
        message: info?.message || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  return (
    <div className="bg-primary-foreground shadow-md p-4 rounded-md md:p-5">
      <h4 className="text-base text-white font-semibold mb-3">Site Info</h4>

      <div>
        <Input
          onChange={(e) => setInfo(e.target.value)}
          value={infoText}
          className="flex h-9 w-full text-white rounded-md border border-border bg-input px-3 py-1 mb-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder="Enter Contact Info"
        />
        <Button size={"sm"} onClick={() => handleSaveInfo()}></Button>
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default SilderInfo;
