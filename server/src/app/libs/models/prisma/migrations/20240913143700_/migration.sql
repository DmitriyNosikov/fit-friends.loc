/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_initiator_user_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_target_user_id_fkey";

-- CreateTable
CREATE TABLE "_UserInitiator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserTarget" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserInitiator_AB_unique" ON "_UserInitiator"("A", "B");

-- CreateIndex
CREATE INDEX "_UserInitiator_B_index" ON "_UserInitiator"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTarget_AB_unique" ON "_UserTarget"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTarget_B_index" ON "_UserTarget"("B");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- AddForeignKey
ALTER TABLE "_UserInitiator" ADD CONSTRAINT "_UserInitiator_A_fkey" FOREIGN KEY ("A") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserInitiator" ADD CONSTRAINT "_UserInitiator_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTarget" ADD CONSTRAINT "_UserTarget_A_fkey" FOREIGN KEY ("A") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTarget" ADD CONSTRAINT "_UserTarget_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
