import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  @Patch('/:idModule')
  async updateModule(
    @Param('idModule') idModule: string,
    @Body() body: CreateModuleDto,
  ) {
    return this.moduleService.updateModule(idModule, body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:idModule')
  async deleteModule(@Param('idModule') idModule: string) {
    return this.moduleService.deleteModule(idModule);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getModule() {
    return this.moduleService.getModule();
  }

  @UseGuards(AuthGuard)
  @Get('/:idModule/contents')
  async getContentModule(@Param('idModule') idModule: string) {
    return this.moduleService.getContentModule(idModule);
  }

  @UseGuards(AuthGuard)
  @Get('/:moduleId/content/:contentId/exercises')
  async getExercisesByContent(
    @Param('moduleId') moduleId: string,
    @Param('contentId') contentId: string,
  ) {
    return this.moduleService.getExercisesByContent(moduleId, contentId);
  }
}
