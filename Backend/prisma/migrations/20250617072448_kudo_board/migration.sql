/*
  Warnings:

  - You are about to drop the column `kudos_count` on the `Kudos_Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kudos_Card" DROP COLUMN "kudos_count",
ADD COLUMN     "Kudos_count" INTEGER NOT NULL DEFAULT 0;
