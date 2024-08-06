/*
  Warnings:

  - You are about to drop the column `sortingOrder` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `AvailableAction` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `AvailableTrigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "sortingOrder";

-- AlterTable
ALTER TABLE "AvailableAction" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "AvailableTrigger" DROP COLUMN "image";
