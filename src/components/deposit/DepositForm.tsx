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
import { Copy } from "lucide-react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { depositSchema } from "@/schema";
import { Prisma } from "@prisma/client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMakeDepositeMutation } from "@/lib/features/api/depositApiSlice";
import toast from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import Loader from "../Loader";
import { useTranslation } from "@/lib/store";
import DataList from "./../input/DataList";

const DepositForm = ({
  gateway,
}: {
  gateway: Prisma.gatewayGetPayload<object>;
}) => {
  const form = useForm<zod.infer<typeof depositSchema>>({
    defaultValues: {
      amount: "",
      reciver: gateway.pay_to[0] || "",
      getwayId: gateway.id,
      sender: "",
      method: gateway.method,
      transictionId: "",
    },
    resolver: zodResolver(depositSchema),
  });

  useEffect(() => {
    if (gateway) {
      form.reset({
        amount: "",
        reciver: gateway.pay_to[0] || "",
        getwayId: gateway.id,
        sender: "",
        method: gateway.method,
        transictionId: "",
      });
    }
  }, [gateway, form]);

  const [makeDeposit, { isLoading }] = useMakeDepositeMutation();

  const lan = useTranslation((state) => state.lan);

  const handleMakeDeposit = (data: zod.infer<typeof depositSchema>) => {
    makeDeposit({
      amount: +data.amount,
      walletNumber: data.sender,
      gatewayId: data.getwayId,
      transactionId: data.transictionId,
    })
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        }
      })
      .catch((error: FetchQueryError) => {
        if (error?.data) {
          toast.error(error.data.message);
        } else {
          toast.error("Somthing went wrong! Try agin");
        }
      });
  };

  const handleNumCopy = (num: string) => {
    navigator.clipboard.writeText(num);
  };

  const isInputDisable = isLoading;

  return (
    <div className="bg-primary">
      <div className="flex items-center gap-3">
        {gateway.pay_to.map((num) => (
          <div key={num} className="flex items-center gap-1 mb-2">
            <span className="text-xs text-white bg-input border border-border px-3 py-2 rounded-lg">
              {num}
            </span>
            <button
              onClick={() => handleNumCopy(num)}
              className="cursor-copy text-white bg-input border border-border rounded-md"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleMakeDeposit)}>
          <FormField
            name="amount"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>{lan == "BN" ? "পরিমাণ" : "Amount"}</FormLabel>
                <FormControl>
                  <div>
                    <DataList
                      onChange={(value) => form.setValue("amount", value)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="sender"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lan == "BN" ? "থেকে পে করা হয়েছে" : "Paid From"}
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

          <FormField
            name="reciver"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lan == "BN" ? "পে করা হয়েছে" : "Paid To"}
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

          <FormField
            name="transictionId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lan == "BN" ? "ট্রানজেকশন আইডি" : "Transiction Id"}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isInputDisable}
                    placeholder={
                      lan == "BN"
                        ? "পেমেন্ট আইডি প্রবেশ করুন"
                        : "Enter your payment Id"
                    }
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-3" size={"sm"} disabled={isInputDisable}>
            {lan == "BN" ? "ডিপোজিট করুন" : "Make Deposit"}
          </Button>
        </form>
      </Form>

      {isInputDisable && <Loader />}
    </div>
  );
};

export default DepositForm;
