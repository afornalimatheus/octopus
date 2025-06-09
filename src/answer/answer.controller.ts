import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerDto } from './dto/answer-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.answerService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.answerService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() answerDto: AnswerDto) {
    return this.answerService.create(answerDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() answerDto: AnswerDto) {
    return this.answerService.update(id, answerDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.answerService.remove(id);
  }
}
