/*
  Warnings:

  - You are about to drop the column `created_at` on the `Account_Confirmation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "verifiedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Account_Confirmation" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
