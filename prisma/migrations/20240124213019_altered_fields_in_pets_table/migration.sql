/*
  Warnings:

  - You are about to drop the column `energy_level` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `independent_level` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `PetGallery` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `energy` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independent` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "PetGallery" DROP CONSTRAINT "PetGallery_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "energy_level",
DROP COLUMN "independent_level",
ADD COLUMN     "energy" INTEGER NOT NULL,
ADD COLUMN     "independent" TEXT NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" TEXT NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" TEXT NOT NULL;

-- DropTable
DROP TABLE "PetGallery";

-- DropEnum
DROP TYPE "Age";

-- DropEnum
DROP TYPE "Environment";

-- DropEnum
DROP TYPE "Level";

-- CreateTable
CREATE TABLE "pet_gallery" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_gallery" ADD CONSTRAINT "pet_gallery_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
