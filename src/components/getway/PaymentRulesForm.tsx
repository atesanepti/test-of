"use client";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { updateGatewaySchema } from "@/schema";
import zod from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Prisma } from "@prisma/client";

interface PaymentRulesFormProps {
  form: UseFormReturn<
    zod.infer<typeof updateGatewaySchema>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  gateway: Prisma.gatewayGetPayload<object>;
}

const PaymentRulesForm = ({ form, gateway }: PaymentRulesFormProps) => {
  enum RulesType {
    DESPOSIT = "DESPOSIT",
    WITHDRAW = "WITHDRAW",
  }
  const [typeOfRules, setTypeOfRules] = useState<RulesType>(RulesType.DESPOSIT);

  useEffect(() => {
    console.log(typeOfRules);
  }, [typeOfRules]);

  return (
    <div>
      
      <Select
        defaultValue={RulesType.DESPOSIT}
        onValueChange={(value: RulesType) => setTypeOfRules(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={RulesType.DESPOSIT}>Deposit Rules</SelectItem>
          <SelectItem value={RulesType.WITHDRAW}>Withdraw Rules</SelectItem>
        </SelectContent>
      </Select>

      <div>
        {typeOfRules === RulesType.DESPOSIT && (
          <DepositRulesForm form={form} gateway={gateway} />
        )}

        {typeOfRules === RulesType.WITHDRAW && (
          <WithdrawForm form={form} gateway={gateway} />
        )}
      </div>

    </div>
  );
};

const DepositRulesForm = ({ form, gateway }: PaymentRulesFormProps) => {
  const [extraRules, setExtraRules] = useState<undefined[]>([]);
  const handleAddNewRuleInput = () => {
    setExtraRules([...extraRules, undefined]);
  };

  return (
    <div>
      {gateway.depositRules.map((r, i) => (
        <FormField
          key={i}
          control={form.control}
          name="depositRules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{i + 1}. Writer Rule </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write rules"
                  value={field.value[i] || r}
                  onChange={(e) => {
                    const newValue = [...form.getValues("depositRules")];
                    newValue[i] = e.target.value;
                    form.setValue("depositRules", newValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      {extraRules.map((_, i) => (
        <FormField
          key={i}
          control={form.control}
          name="depositRules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {gateway.depositRules.length + (i + 1)}. Writer Rule{" "}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write rules"
                  value={field.value[gateway.depositRules.length + i] || ""}
                  onChange={(e) => {
                    const newValue = [...form.getValues("depositRules")];
                    newValue[gateway.depositRules.length + i] = e.target.value;
                    console.log(newValue);
                    form.setValue("depositRules", newValue);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      ))}

      <button
        type="button"
        onClick={handleAddNewRuleInput}
        className="flex items-center gap-3  text-muted hover:text-white transition-colors w-full rounded-md mt-2 text-xs "
      >
        <Plus className="w-3 h-3" />
        Add Rule
      </button>
    </div>
  );
};

const WithdrawForm = ({ form, gateway }: PaymentRulesFormProps) => {
  const [extraRules, setExtraRules] = useState<undefined[]>([]);
  const handleAddNewRuleInput = () => {
    setExtraRules([...extraRules, undefined]);
  };

  return (
    <div>
      {gateway.withdrawRules.map((r, i) => (
        <FormField
          key={i}
          control={form.control}
          name="withdrawRules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{i + 1}. Writer Rule </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write rules"
                  value={field.value[i] || r}
                  onChange={(e) => {
                    const newValue = [...form.getValues("withdrawRules")];
                    newValue[i] = e.target.value;
                    form.setValue("withdrawRules", newValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      {extraRules.map((_, i) => (
        <FormField
          key={i}
          control={form.control}
          name="withdrawRules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {gateway.withdrawRules.length + (i + 1)}. Writer Rule{" "}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write rules"
                  value={field.value[gateway.withdrawRules.length + i] || ""}
                  onChange={(e) => {
                    const newValue = [...form.getValues("withdrawRules")];
                    newValue[gateway.withdrawRules.length + i] = e.target.value;
                    form.setValue("withdrawRules", newValue);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      ))}

      <button
      type="button"
        onClick={handleAddNewRuleInput}
        className="flex items-center gap-3  text-muted hover:text-white transition-colors w-full rounded-md mt-2 text-xs "
      >
        <Plus className="w-3 h-3" />
        Add Rule
      </button>
    </div>
  );
};

export default PaymentRulesForm;
