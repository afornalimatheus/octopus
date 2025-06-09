import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { ExerciseDto } from './dto/exercise-dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: ExerciseDto) {
    return this.exerciseService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getExercise() {
    return this.exerciseService.getExercise();
  }
}
