"use client";
import Image from "next/image";
import React, { useState } from "react";

import banner from "@/../public/assets/slider-1.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoMessage from "@/components/alert/InfoMessage";
import DepositForm from "@/components/deposit/DepositForm";
import DepositRules from "@/components/deposit/DepositRules";
import PaymentMethods from "@/components/getway/PaymentMethods";
import { Prisma } from "@prisma/client";
import PageHeader from "@/components/headers/PageHeader";
import { useTranslation } from "@/lib/store";

const DepositPage = () => {
  const [gateway, setGateway] = useState<Prisma.gatewayGetPayload<object>>();
  const lan = useTranslation((state) => state.lan);
  return (
    <div className="">
      <div className="container px-3 ">
        <PageHeader title="Deposits" />

        <div className="mt-2">
          <div className="mb-3">
            <Image
              src={banner}
              alt="deposit bonus"
              className="w-full aspect-[10/4] rounded-lg object-cover"
              placeholder="blur"
            />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">
            {lan == "BN" ? "ডিপোজিট" : "Deposit"}
          </h3>
          <InfoMessage
            message={
              lan == "BN"
                ? "আপনি আপনার বিকাশ এপ্সের ভিতরে ঢুকে পেমেন্ট ( Payment ) ক্লিক করে পেমেন্ট করবেন"
                : "You will enter your bKash app, click on (Payment) and make the payment.."
            }
          />
        </div>

        <div className="mt-2">
          <PaymentMethods onMethodSelect={(gateway) => setGateway(gateway)} />
        </div>

        {gateway && (
          <Tabs defaultValue="deposit" className="mt-10">
            <TabsList>
              <TabsTrigger value="deposit" className="">
                {lan == "BN" ? "ডিপোজিট" : "Deposit"}
              </TabsTrigger>
              <TabsTrigger value="rules">
                {lan == "BN" ? "রুলস" : "Rules"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit">
              <DepositForm gateway={gateway} />
            </TabsContent>
            <TabsContent value="rules">
              <DepositRules rules={gateway.depositRules} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default DepositPage;
