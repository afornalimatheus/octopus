import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ContentDto, type CreateContentDto } from './dto/content-dto';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(contentData: CreateContentDto): Promise<ContentDto> {
    const content = await this.prisma.content.create({
      data: {
        label: contentData.label,
        moduleId: contentData.moduleId,
        duration: contentData.duration,
        exp: contentData.exp,
        hits: 0,
      },
    });

    if (!content) {
      throw new Error('Content creation failed');
    }

    return new ContentDto(content);
  }

  async getContent(): Promise<ContentDto[]> {
    const contents = await this.prisma.content.findMany({
      orderBy: {
        exp: 'desc',
      },
    });

    if (!contents) {
      throw new Error('No contents found');
    }

    return contents.map((content) => new ContentDto(content));
  }
}
