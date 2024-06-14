/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "day_calories" DROP NOT NULL,
ALTER COLUMN "is_ready_to_training" DROP NOT NULL,
ALTER COLUMN "level" DROP NOT NULL,
ALTER COLUMN "lose_calories" DROP NOT NULL,
ALTER COLUMN "training_time" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "expires_in" TIMESTAMP(3),
    "token_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_user_id_key" ON "refresh_token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
