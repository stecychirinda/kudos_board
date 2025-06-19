/*
  Warnings:

  - You are about to drop the column `isPinned` on the `Kudos_Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kudos_Board" DROP COLUMN "isPinned";

-- AlterTable
ALTER TABLE "Kudos_Card" ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false;
