"use client";
import { siteInfoSchema, siteSettingSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";

import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
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
  const { data } = useFetchSiteInfoQuery();
  const info = data?.payload;

  const form = useForm<zod.infer<typeof siteInfoSchema>>({
    defaultValues: {
      message: info?.message || "",
    },
    resolver: zodResolver(siteSettingSchema),
  });

  const handleSaveInfo = (data: zod.infer<typeof siteInfoSchema>) => {
    infoUpdateApi({ message: data.message })
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveInfo)}>
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>{" "}
                <FormControl>
                  <Input placeholder="Enter message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-2" size={"sm"}>
            Save
          </Button>
        </form>
      </Form>

      {isLoading && <Loader />}
    </div>
  );
};

export default SilderInfo;
