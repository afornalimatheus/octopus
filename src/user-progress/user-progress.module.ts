import { Module } from '@nestjs/common';
import { UserProgressController } from './user-progress.controller';
import { UserProgressService } from './user-progress.service';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [UserProgressController],
  providers: [UserProgressService, PrismaService, UsersService],
  exports: [UserProgressService],
})
export class UserProgressModule {}
