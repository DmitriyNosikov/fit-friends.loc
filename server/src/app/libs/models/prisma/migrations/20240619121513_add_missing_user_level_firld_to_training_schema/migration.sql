/*
  Warnings:

  - Added the required column `userLevel` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "userLevel" TEXT NOT NULL;
