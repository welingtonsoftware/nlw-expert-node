-- CreateTable
CREATE TABLE "PollOption" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,

    CONSTRAINT "PollOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
