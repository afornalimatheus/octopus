import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.exerciseService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getExercise() {
    return this.exerciseService.getExercise();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getExerciseById(@Param('id') id: string) {
    return this.exerciseService.getExerciseById(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id/user/:userId/answers')
  async getExerciseAnswers(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.exerciseService.getExerciseAnswers(id, userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/user/:userId/last-exercise-answer')
  async getLastExerciseAnswer(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.exerciseService.getLastExerciseAnswer(id, userId);
  }
}
