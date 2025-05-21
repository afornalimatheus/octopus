import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { PrismaService } from 'prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [],
  providers: [ScheduleService, PrismaService],
  exports: [ScheduleService],
  imports: [UsersModule],
})
export class ScheduleModule {}
