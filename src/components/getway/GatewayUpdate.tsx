"use client";
import { PaymentMethod, Prisma } from "@prisma/client";
import React, { useEffect, useTransition } from "react";

import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateGatewaySchema } from "@/schema";
import { Button } from "../ui/button";
import PaymentRulesForm from "./PaymentRulesForm";
import { useUpdatePaymentGatewayMutation } from "@/lib/features/api/gatewayApiSlice";
import toast from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import Loader from "../Loader";

const GatewayUpdate = ({
  gateway,
}: {
  gateway: Prisma.gatewayGetPayload<object>;
}) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<zod.infer<typeof updateGatewaySchema>>({
    defaultValues: {
      method: gateway?.method,
      reciver: gateway?.pay_to[0],
      reciverExtra: gateway?.pay_to[1] || "",
      status: gateway?.isActive ? "ACTIVE" : "INACTIVE",
      depositRules: [...gateway.depositRules],
      withdrawRules: [...gateway.withdrawRules],
    },
    resolver: zodResolver(updateGatewaySchema),
  });

  const [updateApi, { isLoading }] = useUpdatePaymentGatewayMutation();

  const handleUpdateGateway = (data: zod.infer<typeof updateGatewaySchema>) => {
    startTransition(() => {
      const paymentNumbers = [];
      if (data.reciver) {
        paymentNumbers.push(data.reciver);
      }
      if (data.reciverExtra) {
        paymentNumbers.push(data.reciverExtra);
      }
      updateApi({
        id: gateway.id,
        payload: {
          pay_to: paymentNumbers,
          depositRules: data.depositRules,
          withdrawRules: data.withdrawRules,
          method: data.method,
          isActive: data.status == "ACTIVE" ? true : false,
        },
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
            toast.error("Somting went wrong Try agin");
          }
        });
    });
  };

  useEffect(() => {
    if (gateway) {
      form.reset({
        method: gateway.method,
        reciver: gateway.pay_to[0],
        reciverExtra: gateway.pay_to[1] || "",
        status: gateway.isActive ? "ACTIVE" : "INACTIVE",
        depositRules: [...gateway.depositRules],
        withdrawRules: [...gateway.withdrawRules],
      });
    }
  }, [gateway, form]);

  const isInputDisable = pending || isLoading;

  return (
    <>
      <Tabs className="w-full mt-10" defaultValue="payment">
        <TabsList>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateGateway)}>
            <TabsContent value="payment">
              <FormField
                name="reciver"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        disabled={isInputDisable}
                        placeholder="01XXXXXXXX"
                        type="number"
                        className="!mb-0"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="reciverExtra"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number (Extra)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isInputDisable}
                        placeholder="01XXXXXXXX"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="method"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Payment method</FormLabel>

                    <FormControl>
                      <Select
                        disabled={isInputDisable}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={PaymentMethod.BKASH}>
                            Bkash
                          </SelectItem>
                          <SelectItem value={PaymentMethod.NAGAD}>
                            Nagad
                          </SelectItem>
                          <SelectItem value={PaymentMethod.ROCKET}>
                            Rocket
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Visibility</FormLabel>

                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isInputDisable}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"ACTIVE"}>Active</SelectItem>
                          <SelectItem value={"INACTIVE"}>Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isInputDisable} size={"sm"} className="mt-5">
                {" "}
                Update{" "}
              </Button>
            </TabsContent>
            <TabsContent value="rules">
              <PaymentRulesForm form={form} gateway={gateway} />
            </TabsContent>
          </form>
        </Form>
      </Tabs>

      {isLoading && <Loader />}
    </>
  );
};

export default GatewayUpdate;
