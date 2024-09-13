/*
  Warnings:

  - You are about to drop the `_UserInitiator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserTarget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserInitiator" DROP CONSTRAINT "_UserInitiator_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserInitiator" DROP CONSTRAINT "_UserInitiator_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserTarget" DROP CONSTRAINT "_UserTarget_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTarget" DROP CONSTRAINT "_UserTarget_B_fkey";

-- DropTable
DROP TABLE "_UserInitiator";

-- DropTable
DROP TABLE "_UserTarget";

-- CreateTable
CREATE TABLE "_user_initiator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_user_target" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_initiator_AB_unique" ON "_user_initiator"("A", "B");

-- CreateIndex
CREATE INDEX "_user_initiator_B_index" ON "_user_initiator"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_user_target_AB_unique" ON "_user_target"("A", "B");

-- CreateIndex
CREATE INDEX "_user_target_B_index" ON "_user_target"("B");

-- AddForeignKey
ALTER TABLE "_user_initiator" ADD CONSTRAINT "_user_initiator_A_fkey" FOREIGN KEY ("A") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_initiator" ADD CONSTRAINT "_user_initiator_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_target" ADD CONSTRAINT "_user_target_A_fkey" FOREIGN KEY ("A") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_target" ADD CONSTRAINT "_user_target_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
