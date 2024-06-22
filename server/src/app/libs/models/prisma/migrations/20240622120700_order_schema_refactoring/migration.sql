/*
  Warnings:

  - The values [umoiney] on the enum `PaymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentType_new" AS ENUM ('visa', 'mir', 'umoney');
ALTER TABLE "Order" ALTER COLUMN "payment_type" TYPE "PaymentType_new" USING ("payment_type"::text::"PaymentType_new");
ALTER TYPE "PaymentType" RENAME TO "PaymentType_old";
ALTER TYPE "PaymentType_new" RENAME TO "PaymentType";
DROP TYPE "PaymentType_old";
COMMIT;
