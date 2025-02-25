"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentMethods from "@/components/getway/PaymentMethods";
import { Prisma } from "@prisma/client";
import PageHeader from "@/components/headers/PageHeader";
import WithdrawRules from "@/components/withdraw/WithdrawRules";
import WithdrawForm from "@/components/withdraw/WithdrawForm";
import { useTranslation } from "@/lib/store";

const WithdrawPage = () => {
  const [gateway, setGateway] = useState<Prisma.gatewayGetPayload<object>>();
  const lan = useTranslation((state) => state.lan);
  return (
    <div className="">
      <div className="container px-3">
        <PageHeader title="Withdraw" />

        <div className="mt-2">
          <PaymentMethods onMethodSelect={(gateway) => setGateway(gateway)} />
        </div>

        {gateway && (
          <Tabs defaultValue="withdraw" className="mt-10">
            <TabsList>
              <TabsTrigger value="withdraw" className="">
                {lan == "BN" ? "উইথড্রো" : "Withdraw"}
              </TabsTrigger>
              <TabsTrigger value="rules">
                {lan == "BN" ? "রুলস" : "Rules"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="withdraw">
              <WithdrawForm gateway={gateway} />
            </TabsContent>
            <TabsContent value="rules">
              <WithdrawRules rules={gateway.withdrawRules} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default WithdrawPage;
