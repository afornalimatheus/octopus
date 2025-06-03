import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerDto } from './dto/answer-dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  async findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.answerService.findOne(id);
  }

  @Post()
  async create(@Body() answerDto: AnswerDto) {
    return this.answerService.create(answerDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() answerDto: AnswerDto) {
    return this.answerService.update(id, answerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.answerService.remove(id);
  }
}
