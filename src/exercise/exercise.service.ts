import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ExerciseDto } from './dto/exercise-dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async getExercise(): Promise<ExerciseDto | null> {
    const exercise = await this.prisma.exercise.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!exercise) {
      throw new Error('No exercise found');
    }

    return exercise;
  }
}
