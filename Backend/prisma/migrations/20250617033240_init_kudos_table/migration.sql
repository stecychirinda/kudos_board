-- CreateTable
CREATE TABLE "Kudos_Board" (
    "id" SERIAL NOT NULL,
    "gif_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Kudos_Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kudos_Card" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gif_url" TEXT NOT NULL,
    "author" TEXT DEFAULT 'Anonymous',
    "boardId" INTEGER NOT NULL,
    "kudos_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Kudos_Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kudos_Card" ADD CONSTRAINT "Kudos_Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Kudos_Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
