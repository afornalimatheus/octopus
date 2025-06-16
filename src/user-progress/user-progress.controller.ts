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
import { UserProgressService } from './user-progress.service';
import type {
  CreateUserProgressDto,
  UpdateUserProgressDto,
} from './dto/user-progress-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.userProgressService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userProgressService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('/userId/:id')
  async findManyByUserId(@Param('id') id: string) {
    return await this.userProgressService.findManyByUserId(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() userProgress: CreateUserProgressDto,
  ) {
    return await this.userProgressService.create(id, userProgress);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userProgress: UpdateUserProgressDto,
  ) {
    return await this.userProgressService.update(id, userProgress);
  }

  @UseGuards(AuthGuard)
  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    return await this.userProgressService.remove(userId);
  }
}
