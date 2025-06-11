import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import type {
  CreateUserProgressDto,
  UpdateUserProgressDto,
  UserProgressDto,
} from './dto/user-progress-dto';

@Injectable()
export class UserProgressService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserProgressDto[]> {
    return await this.prisma.userProgress.findMany();
  }

  async findOne(id: string): Promise<UserProgressDto | null> {
    return await this.prisma.userProgress.findUnique({ where: { id } });
  }

  async create(
    id: string,
    dto: CreateUserProgressDto,
  ): Promise<CreateUserProgressDto> {
    return await this.prisma.userProgress.create({
      data: { ...dto, userId: id },
    });
  }

  async update(
    id: string,
    dto: UpdateUserProgressDto,
  ): Promise<UpdateUserProgressDto> {
    return await this.prisma.userProgress.update({ where: { id }, data: dto });
  }

  async remove(userId: string): Promise<UserProgressDto> {
    const userProgress = await this.prisma.userProgress.findFirst({
      where: { userId },
    });

    if (!userProgress) {
      throw new Error(
        `Não foi encontrado nenhum progresso para o usuário ${userId}`,
      );
    }

    return await this.prisma.userProgress.update({
      where: { id: userProgress.id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
