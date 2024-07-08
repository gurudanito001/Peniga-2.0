-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "transferSent" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "TempAccount" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "accountDetails" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TempAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TempAccount_tradeId_key" ON "TempAccount"("tradeId");

-- AddForeignKey
ALTER TABLE "TempAccount" ADD CONSTRAINT "TempAccount_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
