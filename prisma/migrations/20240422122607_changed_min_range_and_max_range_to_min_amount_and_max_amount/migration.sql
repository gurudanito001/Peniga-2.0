/*
  Warnings:

  - You are about to drop the column `maxRange` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `minRange` on the `Offer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "maxRange",
DROP COLUMN "minRange",
ADD COLUMN     "maxAmount" INTEGER,
ADD COLUMN     "minAmount" INTEGER;
