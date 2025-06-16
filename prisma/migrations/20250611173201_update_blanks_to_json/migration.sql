/*
  Warnings:

  - You are about to alter the column `blanks` on the `exercise` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `exercise` MODIFY `blanks` JSON NOT NULL;