import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AnswerDto } from './dto/answer-dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.answer.findMany();
  }

  async findOne(id: string) {
    return this.prisma.answer.findUnique({ where: { id } });
  }

  async create(answerDto: AnswerDto) {
    if (!answerDto) return null;

    const sanitizedAnswerDto = {
      ...answerDto,
      answer: answerDto.answer ?? Prisma.JsonNull,
    };

    return this.prisma.answer.create({
      data: sanitizedAnswerDto,
    });
  }

  async findOneByExerciseId(exerciseId: string): Promise<AnswerDto | null> {
    return this.prisma.answer.findFirst({
      where: { exerciseId },
    });
  }

  async updateByExerciseId(exerciseId: string, answerDto: Partial<AnswerDto>) {
    if (!answerDto) return null;

    const sanitizedAnswerDto = {
      answer: answerDto.answer ?? Prisma.JsonNull,
      updatedAt: new Date(),
    };

    return this.prisma.answer.updateMany({
      where: { exerciseId },
      data: sanitizedAnswerDto,
    });
  }

  async update(id: string, answerDto: AnswerDto) {
    if (!answerDto) return null;

    const sanitizedAnswerDto = {
      ...answerDto,
      answer: answerDto.answer ?? Prisma.JsonNull,
    };

    return this.prisma.answer.update({
      where: { id },
      data: sanitizedAnswerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.answer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}