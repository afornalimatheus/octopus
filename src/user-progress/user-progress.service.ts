import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import type {
  CreateUserProgressDto,
  UpdateUserProgressDto,
  UserProgressDto,
} from './dto/user-progress-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<UserProgressDto[]> {
    return await this.prisma.userProgress.findMany();
  }

  async findOne(id: string): Promise<UserProgressDto | null> {
    return await this.prisma.userProgress.findUnique({ where: { id } });
  }

  async findManyByUserId(userId: string): Promise<UserProgressDto[]> {
    return await this.prisma.userProgress.findMany({
      where: { userId },
    });
  }

  async create(
    id: string,
    dto: CreateUserProgressDto,
  ): Promise<CreateUserProgressDto> {
    const userProgress = await this.prisma.userProgress.create({
      data: { ...dto, userId: id },
    });

    if (dto.exp && dto.exp > 0) {
      await this.usersService.addExp(id, dto.exp);
    }

    return userProgress;
  }

  async update(
    id: string,
    dto: UpdateUserProgressDto,
  ): Promise<UpdateUserProgressDto> {
    const userProgress = await this.prisma.userProgress.update({
      where: { id },
      data: dto,
    });

    if (dto.exp && dto.exp > 0) {
      const userProgressRecord = await this.prisma.userProgress.findUnique({
        where: { id },
      });

      if (!userProgressRecord) {
        throw new BadRequestException('Progresso do usuário não encontrado');
      }

      await this.usersService.addExp(userProgressRecord.userId, dto.exp);
    }

    return userProgress;
  }

  async remove(userId: string): Promise<UserProgressDto> {
    const userProgress = await this.prisma.userProgress.findFirst({
      where: { userId },
    });

    if (!userProgress) {
      throw new BadRequestException(
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
