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

  async updateModule(
    idModule: string,
    moduleData: CreateModuleDto,
  ): Promise<ModuleDto> {
    const module = await this.prisma.module.findUnique({
      where: { id: idModule },
    });

    if (!module) {
      throw new Error('O módulo enviado não existe.');
    }

    const updatedModule = await this.prisma.module.update({
      where: { id: idModule },
      data: moduleData,
    });

    return updatedModule;
  }

  async deleteModule(idModule: string): Promise<ModuleDto> {
    const module = await this.prisma.module.findUnique({
      where: { id: idModule },
    });

    if (!module) {
      throw new Error('O módulo enviado não existe.');
    }

    return this.prisma.module.update({
      where: { id: idModule },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async getContentModule(idModule: string): Promise<ModuleDto> {
    const module = await this.prisma.module.findUnique({
      where: { id: idModule },
      include: {
        contents: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!module) {
      throw new Error('O módulo enviado não existe.');
    }

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

  async getExercisesByContent(
    moduleId: string,
    contentId: string,
  ): Promise<ModuleDto> {
    const module = await this.prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        contents: {
          where: { id: contentId },
          include: {
            exercises: true,
          },
        },
      },
    });

    if (!module) {
      throw new Error('O módulo enviado não existe.');
    }

    return module;
  }
}
