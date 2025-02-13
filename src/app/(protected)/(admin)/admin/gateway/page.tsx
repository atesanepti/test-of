"use client";
import GatewayUpdate from "@/components/getway/GatewayUpdate";
import GetWayCreator from "@/components/getway/GetWayCreator";
import PaymentMethods from "@/components/getway/PaymentMethods";
import { Prisma } from "@prisma/client";
import React, { useState } from "react";

const GetwayPage = () => {
  const [gateway, setGateway] = useState<Prisma.gatewayGetPayload<object>>();

  return (
    <div>
      <div className="container px-3 ">
        <PaymentMethods
          onMethodSelect={(gateway: Prisma.gatewayGetPayload<object>) =>
            setGateway(gateway)
          }
        />
        {gateway && <GatewayUpdate gateway={gateway} />}

        <GetWayCreator />
      </div>
    </div>
  );
};

export default GetwayPage;
