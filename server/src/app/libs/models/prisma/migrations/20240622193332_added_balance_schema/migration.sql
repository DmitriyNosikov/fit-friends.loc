-- CreateTable
CREATE TABLE "balances" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "service_id" TEXT NOT NULL,
    "remaining_trainings_count" INTEGER NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "balances_service_id_key" ON "balances"("service_id");

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
