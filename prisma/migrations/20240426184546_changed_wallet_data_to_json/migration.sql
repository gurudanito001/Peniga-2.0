/*
  Warnings:

  - You are about to drop the column `bvnDetails` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `customerEmail` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `walletName` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `walletReference` on the `Wallet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Wallet_walletReference_key";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "bvnDetails",
DROP COLUMN "customerEmail",
DROP COLUMN "customerName",
DROP COLUMN "walletName",
DROP COLUMN "walletReference",
ADD COLUMN     "walletData" JSONB;
