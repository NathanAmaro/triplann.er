/*
  Warnings:

  - You are about to drop the column `ands_at` on the `trips` table. All the data in the column will be lost.
  - Added the required column `ends_at` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trips" DROP COLUMN "ands_at",
ADD COLUMN     "ends_at" TIMESTAMP(3) NOT NULL;
