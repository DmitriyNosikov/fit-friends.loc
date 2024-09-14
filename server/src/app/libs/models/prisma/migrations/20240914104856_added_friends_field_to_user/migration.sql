-- CreateTable
CREATE TABLE "_User_friends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_User_friends_AB_unique" ON "_User_friends"("A", "B");

-- CreateIndex
CREATE INDEX "_User_friends_B_index" ON "_User_friends"("B");

-- AddForeignKey
ALTER TABLE "_User_friends" ADD CONSTRAINT "_User_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_friends" ADD CONSTRAINT "_User_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
