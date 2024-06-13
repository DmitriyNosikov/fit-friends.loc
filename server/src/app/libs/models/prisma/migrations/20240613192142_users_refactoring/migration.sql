/*
  Warnings:

  - The `training_type` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL,
DROP COLUMN "training_type",
ADD COLUMN     "training_type" TEXT[];
