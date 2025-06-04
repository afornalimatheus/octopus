import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ExerciseDto } from './dto/exercise-dto';

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
        blanks,
        answer,
        explanation,
      },
    });

    return exercise;
  }

  async getExercise(): Promise<ExerciseDto[] | null> {
    const exercises = await this.prisma.exercise.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!exercises) {
      throw new Error('No exercise found');
    }

    return exercises;
  }
}
