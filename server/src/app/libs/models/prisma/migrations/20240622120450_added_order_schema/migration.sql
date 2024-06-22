-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('visa', 'mir', 'umoiney');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "type" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "trainings_count" INTEGER NOT NULL,
    "totla_price" INTEGER NOT NULL,
    "payment_type" "PaymentType" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
