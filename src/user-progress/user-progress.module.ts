import { Module } from '@nestjs/common';
import { UserProgressController } from './user-progress.controller';
import { UserProgressService } from './user-progress.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [UserProgressController],
  providers: [UserProgressService, PrismaService],
  exports: [UserProgressService],
})
export class UserProgressModule {}
