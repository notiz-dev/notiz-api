-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "sentStartedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentFinishedAt" TIMESTAMP(3) NOT NULL,
    "newsletter" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "subscribed" INTEGER NOT NULL,
    "sent" INTEGER,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);
