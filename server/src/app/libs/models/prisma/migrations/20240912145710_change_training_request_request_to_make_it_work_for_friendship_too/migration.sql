/*
  Warnings:

  - You are about to drop the column `initiator_id` on the `training_requests` table. All the data in the column will be lost.
  - You are about to drop the column `trainer_id` on the `training_requests` table. All the data in the column will be lost.
  - Added the required column `initiator_user_id` to the `training_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request_type` to the `training_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_user_id` to the `training_requests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "training_requests" DROP CONSTRAINT "training_requests_initiator_id_fkey";

-- DropForeignKey
ALTER TABLE "training_requests" DROP CONSTRAINT "training_requests_trainer_id_fkey";

-- AlterTable
ALTER TABLE "training_requests" DROP COLUMN "initiator_id",
DROP COLUMN "trainer_id",
ADD COLUMN     "initiator_user_id" TEXT NOT NULL,
ADD COLUMN     "request_type" TEXT NOT NULL,
ADD COLUMN     "target_user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "training_requests" ADD CONSTRAINT "training_requests_initiator_user_id_fkey" FOREIGN KEY ("initiator_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_requests" ADD CONSTRAINT "training_requests_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
