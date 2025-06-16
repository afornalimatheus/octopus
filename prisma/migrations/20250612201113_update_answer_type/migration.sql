/*
  Warnings:

  - Made the column `answer` on table `exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `exercise` MODIFY `answer` JSON NOT NULL;