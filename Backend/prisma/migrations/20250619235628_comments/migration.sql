-- CreateTable
CREATE TABLE "Kudos_Comment" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "author" TEXT DEFAULT 'Anonymous',
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "Kudos_Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kudos_Comment" ADD CONSTRAINT "Kudos_Comment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Kudos_Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
