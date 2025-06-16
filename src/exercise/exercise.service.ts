import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ExerciseDto } from './dto/exercise-dto';
import type { AnswerDto } from 'src/answer/dto/answer-dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(exerciseDto: ExerciseDto): Promise<ExerciseDto> {
    const {
      contentId,
      type,
      description,
      template,
      data,
      blanks,
      answer,
      explanation,
    } = exerciseDto;

    const exercise = await this.prisma.exercise.create({
      data: {
        contentId,
        type,
        description,
        template,
        data: data ?? {},
        blanks: blanks ?? {},
        answer: answer ?? {},
        explanation,
      },
    });

    return exercise;
  }

  async delete(id: string): Promise<ExerciseDto> {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new Error('Exercicio não encontrado');
    }

    if (exercise.deletedAt) {
      throw new Error('Exercicio já excluído');
    }

    return this.prisma.exercise.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async getExercise(): Promise<ExerciseDto[] | null> {
    const exercises = await this.prisma.exercise.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!exercises) {
      throw new Error('Nenhum exercício encontrado');
    }

    return exercises;
  }

  async getExerciseById(id: string): Promise<ExerciseDto | null> {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new Error('Exercicio não encontrado');
    }

    if (exercise.deletedAt) {
      throw new Error('Exercicio excluído');
    }

    return exercise;
  }

  async getExerciseAnswers(id: string, userId: string): Promise<any[]> {
    const answer = await this.prisma.answer.findMany({
      where: { exerciseId: id, userId: userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!answer || answer.length === 0) {
      throw new Error(
        'Não existem respostas desse usuário para este exercício',
      );
    }

    return answer;
  }

  async getLastExerciseAnswer(
    id: string,
    userId: string,
  ): Promise<AnswerDto | null> {
    const answer = await this.prisma.answer.findFirst({
      where: { exerciseId: id, userId: userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!answer) {
      throw new Error(
        'Não existem respostas desse usuário para este exercício',
      );
    }

    return answer;
  }
}
