/*
  Warnings:

  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "NotificationTypeEnum" ADD VALUE 'TELEGRAM';

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "userId",
ADD COLUMN     "preferencesId" TEXT;

-- CreateTable
CREATE TABLE "NotificationPreferences" (
    "id" TEXT NOT NULL,
    "externalUserId" TEXT NOT NULL,
    "emailEnabled" BOOLEAN NOT NULL,
    "email" TEXT,
    "webEnabled" BOOLEAN NOT NULL,
    "telegramEnabled" BOOLEAN NOT NULL,
    "telegramAccount" INTEGER,

    CONSTRAINT "NotificationPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreferences_externalUserId_key" ON "NotificationPreferences"("externalUserId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "NotificationPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
