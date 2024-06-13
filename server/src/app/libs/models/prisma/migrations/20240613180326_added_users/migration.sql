/*
  Warnings:

  - Added the required column `avatar` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day_calories` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_ready_to_training` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lose_calories` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page_background` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `training_time` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `training_type` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "day_calories" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "is_ready_to_training" BOOLEAN NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "lose_calories" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "page_background" TEXT NOT NULL,
ADD COLUMN     "training_time" TEXT NOT NULL,
ADD COLUMN     "training_type" TEXT NOT NULL;
