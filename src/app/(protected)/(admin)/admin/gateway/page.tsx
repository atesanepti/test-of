"use client";
import GatewayUpdate from "@/components/getway/GatewayUpdate";
import GetWayCreator from "@/components/getway/GetWayCreator";
import PaymentMethods from "@/components/getway/PaymentMethods";
import { Prisma } from "@prisma/client";
import React, { useState } from "react";
import HomeHeader from "@/components/headers/HomeHeader";
import { MoonLoader } from "react-spinners";



const GetwayPage = () => {
  const [gateway, setGateway] = useState<Prisma.gatewayGetPayload<object>>();

  return (
    <div>
      <HomeHeader />
      <div className="container px-3 ">
        <PaymentMethods
          onMethodSelect={(gateway: Prisma.gatewayGetPayload<object>) =>
            setGateway(gateway)
          }
        />
        {gateway && <GatewayUpdate gateway={gateway} />}

        {!gateway && (
          <div className="w-full h-[250px] flex justify-center text-center mt-4">
            <MoonLoader size={20} color="white" />
          </div>
        )}

        <GetWayCreator />
      </div>
    </div>
  );
};

export default GetwayPage;
