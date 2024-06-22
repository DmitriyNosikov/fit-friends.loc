/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_service_id_fkey";

-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "type" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "trainings_count" INTEGER NOT NULL,
    "totla_price" INTEGER NOT NULL,
    "payment_type" "PaymentType" NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
