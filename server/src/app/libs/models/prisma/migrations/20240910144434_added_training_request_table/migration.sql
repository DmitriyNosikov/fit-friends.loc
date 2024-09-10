-- CreateTable
CREATE TABLE "training_requests" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "initiator_id" TEXT NOT NULL,
    "trainer_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "training_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "training_requests" ADD CONSTRAINT "training_requests_initiator_id_fkey" FOREIGN KEY ("initiator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_requests" ADD CONSTRAINT "training_requests_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
