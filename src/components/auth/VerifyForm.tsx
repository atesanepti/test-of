"use client";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import { verifyUser } from "@/actions/verify";
import { useCurrentUser } from "@/hook/useGetUser";

const VerifyForm = () => {
  const token = useSearchParams().get("token") || "";

  const [pending, startTranstion] = useTransition();

  const user = useCurrentUser();

  const handleVerify = () => {
    startTranstion(() => {
      verifyUser(token).then((res) => {
        if (res.success) {
          toast.success("Account Verified");
        } else if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  const isButtonDisable = pending || user?.verified;

  return (
    <div>
      <Button disabled={isButtonDisable} size={"sm"} onClick={handleVerify}>
        {user?.verified && "Verified"}
        {!user?.verified && "Verify"}
      </Button>
    </div>
  );
};

export default VerifyForm;
