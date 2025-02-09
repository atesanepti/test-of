"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useTranslation } from "@/lib/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { signupSchema } from "@/schema";
import { signUp } from "@/actions/signup";
import { redirect } from "next/navigation";

const Signup = () => {
  const [pending, startPending] = useTransition();
  const form = useForm<zod.infer<typeof signupSchema>>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      ref: "",
    },
    resolver: zodResolver(signupSchema),
  });
  const lan = useTranslation((state) => state.lan);
  const handleSignup = (data: zod.infer<typeof signupSchema>) => {
    startPending(() => {
      signUp(data).then((res) => {
        if (res.success) {
          toast.success("Account successfully created");
          redirect("/wallet");
        } else if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  const isInputDisable = pending;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)}>
          <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lan == "BN" ? "আপনার পূর্ণ নাম" : "Your Full Name"}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isInputDisable}
                    autoComplete="off"
                    type="text"
                    placeholder={
                      lan == "BN"
                        ? "আপনার পূর্ণ নাম লিখুন"
                        : "Enter your full name"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lan == "BN" ? "ইমেল ঠিকানা" : "Email address"}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isInputDisable}
                    type="email"
                    autoComplete="off"
                    placeholder={
                      lan == "BN" ? "আপনার ইমেল লিখুন" : "Enter your email"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lan == "BN" ? "ফোন নম্বর" : "Phone Number"}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={
                      lan == "BN"
                        ? "ফোন নম্বর প্রবেশ করুন"
                        : "Enter phone number"
                    }
                    disabled={isInputDisable}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lan == "BN" ? "পাসওয়ার্ড " : "Password"}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isInputDisable}
                    type="password"
                    placeholder={lan == "BN" ? "পাসওয়ার্ড " : "Password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ref"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lan == "BN" ? "রেফ (অপশনাল)" : "Ref (Optional)"}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isInputDisable}
                    type="text"
                    placeholder={lan == "BN" ? "রেফারাল কোড" : "Referral code"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className=" mt-3" disabled={isInputDisable}>
            {lan == "BN" ? "সাইন আপ" : "Sign up"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
