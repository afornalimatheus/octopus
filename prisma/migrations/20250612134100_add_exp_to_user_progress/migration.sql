-- AlterTable
ALTER TABLE `exercise` MODIFY `blanks` JSON NULL;

-- AlterTable
ALTER TABLE `user_progress` ADD COLUMN `exp` INTEGER NULL;