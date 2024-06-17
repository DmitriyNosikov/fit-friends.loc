/*
  Warnings:

  - You are about to drop the column `training_time` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "training_time",
ADD COLUMN     "training_duration" TEXT;
