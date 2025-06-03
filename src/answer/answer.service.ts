import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AnswerDto } from './dto/answer-dto';

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
    return this.prisma.answer.create({ data: answerDto });
  }

  async update(id: string, answerDto: AnswerDto) {
    return this.prisma.answer.update({
      where: { id },
      data: answerDto,
    });
  }

  async remove(id: string) {
    return this.prisma.answer.delete({ where: { id } });
  }
}
