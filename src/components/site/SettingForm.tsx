"use client";
import React, { useEffect } from "react";
import zod from "zod";

import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { siteSettingSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  useFetchSiteSettingQuery,
  useUpdateSiteSettingMutation,
} from "@/lib/features/api/settingApiSlice";
import toast from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import Loader from "../Loader";

const SettingForm = () => {
  const { data } = useFetchSiteSettingQuery();
  const [settingUpdateApi, { isLoading: updateLoading }] =
    useUpdateSiteSettingMutation();
  const form = useForm<zod.infer<typeof siteSettingSchema>>({
    defaultValues: {
      depositBonusPercent: `${data?.payload.depositBounsPercent || 0}`,
      referBonus: `${data?.payload.referBonus || 0}`,
      minDeposit: `${data?.payload.minDeposit || 0}`,
      minWithdraw: `${data?.payload.minWithDraw || 0}`,
    },
    resolver: zodResolver(siteSettingSchema),
  });

  const handleUpdate = (data: zod.infer<typeof siteSettingSchema>) => {
    settingUpdateApi({
      referBonus: +data.referBonus,
      depositBonusPercent: +data.depositBonusPercent,
      minDeposit: +data.minDeposit,
      minWithdraw: +data.minWithdraw,
    })
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success("Setting Updated");
        }
      })
      .catch((error: FetchQueryError) => {
        console.log("dd", error);
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error("Unknown Error Try agin");
        }
      });
  };

  useEffect(() => {
    if (data) {
      form.reset({
        depositBonusPercent: `${data?.payload.depositBounsPercent || 0}`,
        referBonus: `${data?.payload.referBonus || 0}`,
        minDeposit: `${data?.payload.minDeposit || 0}`,
        minWithdraw: `${data?.payload.minWithDraw || 0}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="bg-primary-foreground shadow-md p-4 rounded-md md:p-5">
      {data && (
        <>
          <h4 className="text-base text-white font-semibold mb-3">
            Bonus Information
          </h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
              <FormField
                control={form.control}
                name="referBonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Refer Bonus</FormLabel>
                    <FormControl>
                      <Input
                        className="!bg-secondary-foreground !border-none"
                        {...field}
                        placeholder="Enter Amount"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="depositBonusPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Bonus Percentage</FormLabel>
                    <FormControl>
                      <Input
                        className="!bg-secondary-foreground !border-none"
                        {...field}
                        placeholder="Enter Percentage"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimun Deposit</FormLabel>
                    <FormControl>
                      <Input
                        className="!bg-secondary-foreground !border-none"
                        {...field}
                        placeholder="Enter Amount"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minWithdraw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimun Withdraw</FormLabel>
                    <FormControl>
                      <Input
                        className="!bg-secondary-foreground !border-none"
                        {...field}
                        placeholder="Enter Amount"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button size={"sm"} className="mt-3">
                Change
              </Button>
            </form>
          </Form>
        </>
      )}

      {updateLoading && <Loader />}
    </div>
  );
};

export default SettingForm;
