/*
  Warnings:

  - A unique constraint covering the columns `[emailAddress]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "status" SET DEFAULT 'PendingApproval';

-- CreateIndex
CREATE UNIQUE INDEX "users_emailAddress_key" ON "users"("emailAddress");
