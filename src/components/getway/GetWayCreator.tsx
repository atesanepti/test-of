import { Plus } from "lucide-react";
import React from "react";
import AddPaymentGateway from "./AddPaymentGatewayForm";

const GetWayCreator = () => {
  return (
    <AddPaymentGateway>
      <div className="fixed bottom-5 right-5 flex gap-2 items-center my-3">
        <button className="bg-input transition-all p-2 rounded-lg border border-border text-muted hover:text-white flex flex-col justify-center items-center">
          <Plus className="w-6 h-6 " />
        </button>
      </div>
    </AddPaymentGateway>
  );
};

export default GetWayCreator;
