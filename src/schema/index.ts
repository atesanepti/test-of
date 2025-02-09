import { PaymentMethod } from "@prisma/client";
import zod from "zod";

export const signupSchema = zod.object({
  fullName: zod.string().min(4, "Name must be at least 4 characters"),
  phone: zod.string().min(1, "Phone is required"),
  email: zod.string().email(),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  ref: zod.optional(zod.string()),
});

export const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1, "Password is required"),
});

export const verifySchema = zod.object({
  email: zod.string().email(),
});

export const depositSchema = zod.object({
  amount: zod.string().min(1, "Amount is required"),
  reciver: zod.string().min(1, "Reciver number is required"),
  sender: zod.string().min(1, "Sender number is required"),
  transictionId: zod
    .string()
    .min(10, "Invalid Transiction Id")
    .max(10, "Invalid Transiction Id")
    .regex(/^[A-Za-z0-9]{10,20}$/, "Invalid Transiction Id"),
    method: zod.enum([PaymentMethod.BKASH, PaymentMethod.NAGAD], {
    message: "Unknown payment method",
  }),
  getwayId: zod.string(),
});

export const newGatewaySchema = zod.object({
  reciver: zod.string().min(1, "Payment number is required"),
  reciverExtra: zod.optional(zod.string()),
  method: zod.enum([PaymentMethod.BKASH, PaymentMethod.NAGAD], {
    message: "Unknown payment method",
  }),
  status: zod.enum(["ACTIVE", "INACTIVE"]),
});

export const updateGatewaySchema = zod.object({
  reciver: zod.string().min(1, "Payment number is required"),
  reciverExtra: zod.optional(zod.string()),
  method: zod.enum([PaymentMethod.BKASH, PaymentMethod.NAGAD], {
    message: "Unknown payment method",
  }),
  status: zod.enum(["ACTIVE", "INACTIVE"]),
  depositRules: zod.array(zod.string()),
  withdrawRules: zod.array(zod.string()),
});

export const withdrawSchema = zod.object({
  walletNumber: zod.string().min(1, "Wallet number is required"),
  gatewayId: zod.string().min(1, "Gateway is required"),
  amount: zod.string().min(1, "Withdrawal amount is required"),
});

export const siteSettingSchema = zod.object({
  referBonus: zod.string().min(1, "Refer Bonus is required"),
  depositBonusPercent: zod.string().min(1, "Deposit Bonus is required"),
  minDeposit: zod.string().min(1, "Minimum Deposit is required"),
  minWithdraw: zod.string().min(1, "Minimum Withdraw is required"),
});

export const contactSchema = zod.object({
  whatsapp: zod.optional(zod.string()),
  telegram: zod.optional(zod.string()),
  facebook: zod.optional(zod.string()),
});
