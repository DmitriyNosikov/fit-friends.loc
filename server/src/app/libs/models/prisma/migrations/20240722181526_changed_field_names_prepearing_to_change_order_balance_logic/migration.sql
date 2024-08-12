/*
  Warnings:

  - You are about to drop the column `order_id` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `service_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `trainingId` on the `training_reviews` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `training_reviews` table. All the data in the column will be lost.
  - Added the required column `training_id` to the `balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `training_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `training_id` to the `training_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `training_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "balances" DROP CONSTRAINT "balances_order_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_service_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "training_reviews" DROP CONSTRAINT "training_reviews_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "training_reviews" DROP CONSTRAINT "training_reviews_userId_fkey";

-- DropIndex
DROP INDEX "balances_order_id_key";

-- AlterTable
ALTER TABLE "balances" DROP COLUMN "order_id",
ADD COLUMN     "training_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "service_id",
DROP COLUMN "userId",
ADD COLUMN     "training_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "training_reviews" DROP COLUMN "trainingId",
DROP COLUMN "userId",
ADD COLUMN     "training_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_reviews" ADD CONSTRAINT "training_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_reviews" ADD CONSTRAINT "training_reviews_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
