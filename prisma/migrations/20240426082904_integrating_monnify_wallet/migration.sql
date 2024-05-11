/*
  Warnings:

  - A unique constraint covering the columns `[walletReference]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "bvnDetails" JSONB,
ADD COLUMN     "customerEmail" TEXT,
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "walletName" TEXT,
ADD COLUMN     "walletReference" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_walletReference_key" ON "Wallet"("walletReference");
