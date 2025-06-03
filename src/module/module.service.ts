import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ModuleDto, type CreateModuleDto } from './dto/module-dto';

@Injectable()
export class ModuleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(moduleData: CreateModuleDto): Promise<ModuleDto> {
    const module = await this.prisma.module.create({
      data: moduleData,
    });

    return module;
  }

  async getModule(): Promise<ModuleDto[]> {
    const modules = await this.prisma.module.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!modules) {
      throw new Error('No modules found');
    }

    return modules;
  }
}
