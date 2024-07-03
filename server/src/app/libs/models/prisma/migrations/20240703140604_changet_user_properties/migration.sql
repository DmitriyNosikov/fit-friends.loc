/*
  Warnings:

  - You are about to drop the column `day_calories` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lose_calories` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "day_calories",
DROP COLUMN "lose_calories",
ADD COLUMN     "day_calories_limit" INTEGER,
ADD COLUMN     "lose_calories_limit" INTEGER;
