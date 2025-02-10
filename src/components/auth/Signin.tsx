"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

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
import Link from "next/link";
import { signinSchema } from "@/schema";
import { signin } from "@/actions/signin";
import { useTranslation } from "@/lib/store";

const Signin = () => {
  const params = useSearchParams();
  const redirectUrl = params.get("redirect") || "";
  const [pending, startTranstion] = useTransition();
  const form = useForm<zod.infer<typeof signinSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema),
  });
  const lan = useTranslation((state) => state.lan);
  const handleSignin = (data: zod.infer<typeof signinSchema>) => {
    startTranstion(() => {
      signin(data).then((res) => {
        if (res.success) {
          toast.success("Login successfull");
          location.reload();
          redirect(redirectUrl || res.redirect);
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
        <form onSubmit={form.handleSubmit(handleSignin)}>
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
                    type="email"
                    autoComplete="off"
                    placeholder={
                      lan == "BN" ? "আপনার ইমেল লিখুন" : "Enter your email"
                    }
                    {...field}
                    disabled={isInputDisable}
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
                <FormLabel>{lan == "BN" ? "পাসওয়ার্ড" : "Password"}</FormLabel>
                <FormControl>
                  <Input
                    type="Password"
                    placeholder={lan == "BN" ? "পাসওয়ার্ড" : "Password"}
                    {...field}
                    disabled={isInputDisable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/forget-password"
            className="block text-brand hover:underline text-right text-xs lg:text-sm mt-2"
          >
            {lan == "BN" ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forget password?"}
          </Link>
          <Button size={"sm"} className="mt-3" disabled={isInputDisable}>
            {lan == "BN" ? "সাইন ইন" : "Sign in"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signin;
