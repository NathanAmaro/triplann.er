-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "sequence" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ands_at" TIMESTAMP(3) NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);
