/*
  Warnings:

  - You are about to drop the `_user_initiator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user_target` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_user_initiator" DROP CONSTRAINT "_user_initiator_A_fkey";

-- DropForeignKey
ALTER TABLE "_user_initiator" DROP CONSTRAINT "_user_initiator_B_fkey";

-- DropForeignKey
ALTER TABLE "_user_target" DROP CONSTRAINT "_user_target_A_fkey";

-- DropForeignKey
ALTER TABLE "_user_target" DROP CONSTRAINT "_user_target_B_fkey";

-- DropTable
DROP TABLE "_user_initiator";

-- DropTable
DROP TABLE "_user_target";

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_initiator_user_id_fkey" FOREIGN KEY ("initiator_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
