"use client";
import React, { useState, useTransition } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { newGatewaySchema } from "@/schema";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@prisma/client";
import { useCreatePaymentGatewayMutation } from "@/lib/features/api/gatewayApiSlice";
import { toast } from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import Loader from "../Loader";

const AddPaymentGateway = ({ children }: { children: React.ReactNode }) => {
  const [pending, startTransition] = useTransition();
  const [extraNumberVisible, setExtraNumber] = useState(false);
  const form = useForm<zod.infer<typeof newGatewaySchema>>({
    defaultValues: {
      status: "ACTIVE",
      method: "BKASH",
      reciver: "",
      reciverExtra: "",
    },
    resolver: zodResolver(newGatewaySchema),
  });

  const [createGateway, { isLoading }] = useCreatePaymentGatewayMutation();

  const handleCreateGateway = (data: zod.infer<typeof newGatewaySchema>) => {
    startTransition(() => {
      const paymentNumbers = [];
      if (data.reciver) {
        paymentNumbers.push(data.reciver);
      } else if (data.reciverExtra) {
        paymentNumbers.push(data.reciverExtra);
      }
      createGateway({
        method: data.method,
        pay_to: paymentNumbers,
        isActive: data.status === "ACTIVE" ? true : false,
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
            toast.error("Somting went wrong try agin");
          }
        });
    });
  };

  const isInputDisable = pending || isLoading;

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateGateway)}>
              <FormField
                name="reciver"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <div className="flex items-start">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isInputDisable}
                          placeholder="01XXXXXXXX"
                          type="number"
                          className="!mb-0"
                        />
                      </FormControl>
                      {!extraNumberVisible && (
                        <Button
                          onClick={() => setExtraNumber(true)}
                          type="button"
                          size={"sm"}
                        >
                          <Plus className="w-5 h-4" />
                        </Button>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {extraNumberVisible && (
                <FormField
                  name="reciverExtra"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number (Extra)</FormLabel>
                      <div className="flex items-start ">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isInputDisable}
                            placeholder="01XXXXXXXX"
                            type="number"
                          />
                        </FormControl>
                        {extraNumberVisible && (
                          <Button
                            onClick={() => setExtraNumber(false)}
                            type="button"
                            size={"sm"}
                          >
                            <Minus className="w-5 h-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                name="method"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Payment method</FormLabel>

                    <FormControl>
                      <Select
                        disabled={isInputDisable}
                        defaultValue={field.value}
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
                        defaultValue={field.value}
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

              <Button size={"sm"} className="mt-5">
                {" "}
                Create{" "}
              </Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>

      {isLoading && <Loader />}
    </>
  );
};

export default AddPaymentGateway;
