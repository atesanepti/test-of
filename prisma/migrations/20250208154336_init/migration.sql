-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'AGENT');

-- CreateEnum
CREATE TYPE "DepositsStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "WithdrawsStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('RUNNING', 'LOST', 'WON');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BKASH', 'NAGAD');

-- CreateEnum
CREATE TYPE "BetResult" AS ENUM ('PROFILT', 'LOSS');

-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('DEPOSIT', 'WITHDRAW');

-- CreateEnum
CREATE TYPE "LotterStatus" AS ENUM ('CHECKING', 'UNMATCHED', 'MATCHED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "my_ref" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposits" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "DepositsStatus" NOT NULL DEFAULT 'PENDING',
    "transaction_id" TEXT NOT NULL,
    "walletNumber" TEXT NOT NULL,
    "gateway_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deposits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdraws" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "WithdrawsStatus" NOT NULL DEFAULT 'PENDING',
    "user_id" TEXT NOT NULL,
    "pay_to" TEXT NOT NULL,
    "gateway_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "withdraws_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet" (
    "id" TEXT NOT NULL,
    "account" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bonusWallet" (
    "id" TEXT NOT NULL,
    "account" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "bonusWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bets" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "BetStatus" NOT NULL DEFAULT 'RUNNING',
    "user_id" TEXT NOT NULL,
    "bet_id" TEXT NOT NULL,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gateway" (
    "id" TEXT NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "pay_to" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "depositRules" TEXT[],
    "withdrawRules" TEXT[],

    CONSTRAINT "gateway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "multiplierHistory" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "multiplierHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "multiplierHistoryData" (
    "id" TEXT NOT NULL,
    "multiplier" DECIMAL(65,30) NOT NULL,
    "base_amount" INTEGER NOT NULL,
    "result" "BetResult" NOT NULL,
    "profit" INTEGER,
    "history_id" TEXT NOT NULL,

    CONSTRAINT "multiplierHistoryData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "log_type" "LogType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "des" TEXT,
    "visited" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siteSetting" (
    "id" TEXT NOT NULL,
    "referBonus" INTEGER NOT NULL,
    "depositBounsPercent" INTEGER NOT NULL,
    "minDeposit" INTEGER NOT NULL,
    "minWithDraw" INTEGER NOT NULL,

    CONSTRAINT "siteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotteryTickets" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "LotterStatus" NOT NULL DEFAULT 'CHECKING',
    "prize" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "lotteryID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lotteryTickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lottery" (
    "id" TEXT NOT NULL,

    CONSTRAINT "lottery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "whatsapp" TEXT,
    "facebook" TEXT,
    "telegram" TEXT,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siteUpdate" (
    "id" TEXT NOT NULL,
    "updateMessage" TEXT,

    CONSTRAINT "siteUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_user_id_key" ON "wallet"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "bonusWallet_user_id_key" ON "bonusWallet"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "gateway_method_key" ON "gateway"("method");

-- CreateIndex
CREATE UNIQUE INDEX "multiplierHistory_user_id_key" ON "multiplierHistory"("user_id");

-- AddForeignKey
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_gateway_id_fkey" FOREIGN KEY ("gateway_id") REFERENCES "gateway"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdraws" ADD CONSTRAINT "withdraws_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdraws" ADD CONSTRAINT "withdraws_gateway_id_fkey" FOREIGN KEY ("gateway_id") REFERENCES "gateway"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonusWallet" ADD CONSTRAINT "bonusWallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multiplierHistory" ADD CONSTRAINT "multiplierHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multiplierHistoryData" ADD CONSTRAINT "multiplierHistoryData_history_id_fkey" FOREIGN KEY ("history_id") REFERENCES "multiplierHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotteryTickets" ADD CONSTRAINT "lotteryTickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotteryTickets" ADD CONSTRAINT "lotteryTickets_lotteryID_fkey" FOREIGN KEY ("lotteryID") REFERENCES "lottery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
