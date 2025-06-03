import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService, PrismaService],
  exports: [ModuleService],
})
export class ModuleModule {}
