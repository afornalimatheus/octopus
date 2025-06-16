import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ContentDto, type CreateContentDto } from './dto/content-dto';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    idModule: string,
    contentData: CreateContentDto,
  ): Promise<ContentDto> {
    const module = await this.prisma.module.findUnique({
      where: { id: idModule },
      select: { id: true },
    });

    if (!module) {
      throw new Error('O módulo enviado não existe.');
    }

    const content = await this.prisma.content.create({
      data: {
        label: contentData.label,
        moduleId: idModule,
      },
    });

    if (!content) {
      throw new Error('Não foi possível criar o conteúdo.');
    }

    return new ContentDto(content);
  }

  async getContentByModule(idModule: string): Promise<ContentDto[]> {
    const module = await this.prisma.module.findUnique({
      where: { id: idModule },
    });

    if (!module) {
      throw new Error('O módulo enviado não existe.');
    }

    const contents = await this.prisma.content.findMany({
      where: { moduleId: idModule },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!contents) {
      throw new Error('Nenhum conteúdo encontrado para este módulo.');
    }

    return contents.map((content) => new ContentDto(content));
  }

  async getExercisesByContent(idContent: string): Promise<ContentDto> {
    const content = await this.prisma.content.findUnique({
      where: { id: idContent },
      include: { exercises: true },
    });

    if (!content) {
      throw new Error('O conteúdo enviado não existe.');
    }

    if (content.exercises.length === 0) {
      throw new Error('Nenhum exercício encontrado para este conteúdo.');
    }

    return content;
  }

  async getContent(): Promise<ContentDto[]> {
    const contents = await this.prisma.content.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!contents) {
      throw new Error('No contents found');
    }

    return contents.map((content) => new ContentDto(content));
  }
}
