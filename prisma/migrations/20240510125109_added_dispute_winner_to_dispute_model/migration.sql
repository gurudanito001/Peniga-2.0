-- AlterTable
ALTER TABLE "Dispute" ADD COLUMN     "disputeWinnerId" TEXT;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_disputeWinnerId_fkey" FOREIGN KEY ("disputeWinnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
