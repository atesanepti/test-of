"use client";
import Image from "next/image";
import React, { useState } from "react";

import banner from "@/../public/assets/slider-2.jpeg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoMessage from "@/components/alert/InfoMessage";
import DepositForm from "@/components/deposit/DepositForm";
import DepositRules from "@/components/deposit/DepositRules";
import PaymentMethods from "@/components/getway/PaymentMethods";
import { Prisma } from "@prisma/client";
import PageHeader from "@/components/headers/PageHeader";

const DepositPage = () => {
  const [gateway, setGateway] = useState<Prisma.gatewayGetPayload<object>>();

  return (
    <div className="">
      <div className="container px-3 ">
        <PageHeader title="Deposits" />

        <div className="mt-2">
          <div className="mb-3">
            <Image
              src={banner}
              alt="deposit bonus"
              className="w-full aspect-video rounded-lg"
              placeholder="blur"
            />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">Deposit</h3>
          <InfoMessage message="Note : If You don't get Deposit at time please contact our Team with your deposit info." />
        </div>

        <div className="mt-2">
          <PaymentMethods onMethodSelect={(gateway) => setGateway(gateway)} />
        </div>

        {gateway && (
          <Tabs defaultValue="deposit" className="mt-10">
            <TabsList>
              <TabsTrigger value="deposit" className="">
                Deposit
              </TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
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
