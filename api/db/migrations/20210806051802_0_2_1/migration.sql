-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "lastLoginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
