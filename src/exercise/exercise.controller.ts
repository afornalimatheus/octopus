import { Controller, Get, UseGuards } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getExercise() {
    return this.exerciseService.getExercise();
  }
}
