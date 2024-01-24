/*
  Warnings:

  - You are about to drop the column `registered_at` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "registered_at",
DROP COLUMN "requirements",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
