-- CreateTable
CREATE TABLE "training_reviews" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "training_reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "training_reviews" ADD CONSTRAINT "training_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_reviews" ADD CONSTRAINT "training_reviews_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
