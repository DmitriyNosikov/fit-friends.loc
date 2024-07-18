/*
  Warnings:

  - You are about to drop the column `service_id` on the `balances` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `balances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `balances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "balances" DROP CONSTRAINT "balances_service_id_fkey";

-- DropIndex
DROP INDEX "balances_service_id_key";

-- AlterTable
ALTER TABLE "balances" DROP COLUMN "service_id",
ADD COLUMN     "order_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "balances_order_id_key" ON "balances"("order_id");

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
