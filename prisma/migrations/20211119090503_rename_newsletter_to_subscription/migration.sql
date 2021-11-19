ALTER TABLE "Newsletter" RENAME TO "Subscription";

-- AlterTable
ALTER TABLE "Subscription" RENAME CONSTRAINT "Newsletter_pkey" TO "Subscription_pkey";

-- RenameIndex
ALTER INDEX "Newsletter_email_key" RENAME TO "Subscription_email_key";
