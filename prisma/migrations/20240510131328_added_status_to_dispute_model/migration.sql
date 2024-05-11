-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('PENDING', 'RESOLVED');

-- AlterTable
ALTER TABLE "Dispute" ADD COLUMN     "status" "DisputeStatus" DEFAULT 'PENDING';
