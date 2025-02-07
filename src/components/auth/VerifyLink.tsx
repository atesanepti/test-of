"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

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
import { verifySchema } from "@/schema";
import { redirect } from "next/navigation";
import { generateVerificationLink } from "@/actions/verify";
import { Info } from "lucide-react";

const VerifyLink = ({ email }: { email?: string }) => {
  const [hasEmailSent, setEmailSent] = useState(false);

  const [pending, startPending] = useTransition();
  const form = useForm<zod.infer<typeof verifySchema>>({
    defaultValues: {
      email: email || "",
    },
    resolver: zodResolver(verifySchema),
  });

  const handleVerify = (data: zod.infer<typeof verifySchema>) => {
    startPending(() => {
      generateVerificationLink(data).then((res) => {
        if (res.success) {
          toast.success("Verification Link sent to your Email");
          setEmailSent(true);
        } else if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  const handleSkip = () => {
    redirect("/signin");
  };

  const isButtonDisable = hasEmailSent || pending;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerify)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Full Name</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    type="text"
                    placeholder="Enter your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span className="text-[10px] md:text-xs text-muted mt-1 flex items-center gap-1">
            {hasEmailSent ? (
              <>
                Did&lsquo;t get{" "}
                <button
                  onClick={() => setEmailSent(false)}
                  className="text-[10px] md:text-xs text-brand hover:text-brand/90"
                >
                  Refresh
                </button>
              </>
            ) : (
              <>
                {" "}
                <Info className="w-3 h-3" />
                Verification like will be sent on your Email
              </>
            )}
          </span>

          <div className="flex gap-2 items-center mt-5 ">
            <Button size={"sm"} disabled={isButtonDisable}>
              Send Link
            </Button>
            <Button
              onClick={handleSkip}
              type="button"
              size={"sm"}
              variant={"outline"}
            >
              Skip
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyLink;
