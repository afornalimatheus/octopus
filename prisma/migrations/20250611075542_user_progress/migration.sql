/*
  Warnings:

  - You are about to drop the column `duration` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `exp` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `hits` on the `content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `content` DROP COLUMN `duration`,
    DROP COLUMN `exp`,
    DROP COLUMN `hits`;

-- CreateTable
CREATE TABLE `user_progress` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,
    `duration` INTEGER NULL,
    `hits` INTEGER NULL,
    `completed_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_progress` ADD CONSTRAINT `user_progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_progress` ADD CONSTRAINT `user_progress_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
