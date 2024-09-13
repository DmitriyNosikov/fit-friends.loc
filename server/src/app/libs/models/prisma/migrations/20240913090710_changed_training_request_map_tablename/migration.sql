/*
  Warnings:

  - You are about to drop the `training_requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "training_requests" DROP CONSTRAINT "training_requests_initiator_user_id_fkey";

-- DropForeignKey
ALTER TABLE "training_requests" DROP CONSTRAINT "training_requests_target_user_id_fkey";

-- DropTable
DROP TABLE "training_requests";

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "request_type" TEXT NOT NULL,
    "initiator_user_id" TEXT NOT NULL,
    "target_user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_initiator_user_id_fkey" FOREIGN KEY ("initiator_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
