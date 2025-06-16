/*
  Warnings:

  - You are about to alter the column `answer` on the `answer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `Json`.
  - You are about to alter the column `answer` on the `exercise` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `answer` MODIFY `answer` JSON NOT NULL;

-- AlterTable
ALTER TABLE `exercise` MODIFY `answer` JSON NULL;