import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ModuleService } from './module.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { CreateModuleDto } from './dto/module-dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CreateModuleDto) {
    return this.moduleService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getModule() {
    return this.moduleService.getModule();
  }
}
