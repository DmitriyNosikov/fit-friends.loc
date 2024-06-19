-- CreateTable
CREATE TABLE "trainings" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "training_type" TEXT NOT NULL,
    "training_duration" TEXT NOT NULL,
    "calories" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "trainers_name" TEXT NOT NULL,
    "is_special" BOOLEAN,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);
