/*
  Warnings:

  - Added the required column `has_training_started` to the `balances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "balances" ADD COLUMN     "has_training_started" BOOLEAN NOT NULL;
