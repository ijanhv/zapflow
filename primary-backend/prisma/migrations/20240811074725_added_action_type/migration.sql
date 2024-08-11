/*
  Warnings:

  - A unique constraint covering the columns `[userId,externalAppId]` on the table `ExternalAppUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actionType` to the `AvailableAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `AvailableAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableAction" ADD COLUMN     "actionType" TEXT NOT NULL,
ADD COLUMN     "service" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExternalAppUser_userId_externalAppId_key" ON "ExternalAppUser"("userId", "externalAppId");
