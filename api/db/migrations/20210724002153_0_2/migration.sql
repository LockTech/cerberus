/*
  Warnings:

  - You are about to drop the column `created_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `organization_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Organization` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_organization_id_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "created_at",
DROP COLUMN "organization_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Account_Confirmation" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organizationId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_Confirmation.code_unique" ON "Account_Confirmation"("code");

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
