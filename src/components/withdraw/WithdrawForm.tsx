"use client";
import React, { useEffect } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import zod from "zod";
import { withdrawSchema } from "@/schema";
import { Prisma } from "@prisma/client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import { useMakeWithdrawMutation } from "@/lib/features/api/withdrawApiSlice";
import Loader from "../Loader";
import { useTranslation } from "@/lib/store";

const WithdrawForm = ({
  gateway,
}: {
  gateway: Prisma.gatewayGetPayload<object>;
}) => {
  const form = useForm<zod.infer<typeof withdrawSchema>>({
    defaultValues: {
      amount: "",
      gatewayId: gateway.id,
      walletNumber: "",
    },
    resolver: zodResolver(withdrawSchema),
  });

  const lan = useTranslation((state) => state.lan);

  useEffect(() => {
    if (gateway) {
      form.reset({
        amount: "",
        gatewayId: gateway.id,
        walletNumber: "",
      });
    }
  }, [gateway, form]);

  const [makeWithdraw, { isLoading }] = useMakeWithdrawMutation();

  const handleMakeDeposit = (data: zod.infer<typeof withdrawSchema>) => {
    makeWithdraw({
      amount: +data.amount,
      pay_to: data.walletNumber,
      gateway_id: data.gatewayId,
    })
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        }
      })
      .catch((error: FetchQueryError) => {
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error("Something went wrong Try agin");
        }
      });
  };

  const isInputDisable = isLoading;

  return (
    <div className="bg-primary">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleMakeDeposit)}>
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{lan == "BN" ? "পরিমাণ" : "Amount"}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isInputDisable}
                    placeholder={lan == "BN" ? "পরিমাণ" : "Amount"}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="walletNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lan == "BN"
                    ? "আপনার ওয়ালেট নম্বর প্রবেশ করুন"
                    : "Enter your Wallet Number"}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isInputDisable}
                    placeholder={
                      lan == "BN" ? "ওয়ালেট নম্বর" : "Wallet number"
                    }
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-3" size={"sm"} disabled={isInputDisable}>
            {lan == "BN" ? "উত্তোলন করুন" : "Make Withdraw"}
          </Button>
        </form>
      </Form>

      {isInputDisable && <Loader />}
    </div>
  );
};

export default WithdrawForm;
