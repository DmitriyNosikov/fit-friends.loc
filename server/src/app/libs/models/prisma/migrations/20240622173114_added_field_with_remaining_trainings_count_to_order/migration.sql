/*
  Warnings:

  - Added the required column `remaining_trainings_count` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "remaining_trainings_count" INTEGER NOT NULL;
