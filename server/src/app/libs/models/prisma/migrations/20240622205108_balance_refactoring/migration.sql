/*
  Warnings:

  - You are about to drop the column `totla_price` on the `orders` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "totla_price",
ADD COLUMN     "total_price" INTEGER NOT NULL;
