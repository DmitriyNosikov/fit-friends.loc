/*
  Warnings:

  - Added the required column `user_id` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "trainers_name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
