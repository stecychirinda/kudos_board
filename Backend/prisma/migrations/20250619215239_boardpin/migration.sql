/*
  Warnings:

  - You are about to drop the column `isPinned` on the `Kudos_Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kudos_Board" ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Kudos_Card" DROP COLUMN "isPinned";
