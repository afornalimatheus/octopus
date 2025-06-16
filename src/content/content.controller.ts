import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { CreateContentDto } from './dto/content-dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Post('/module/:idModule')
  async create(
    @Param('idModule') idModule: string,
    @Body() body: CreateContentDto,
  ) {
    return this.contentService.create(idModule, body);
  }

  @UseGuards(AuthGuard)
  @Get('/module/:idModule')
  async getContentByModule(@Param('idModule') idModule: string) {
    return this.contentService.getContentByModule(idModule);
  }

  @UseGuards(AuthGuard)
  @Get('/:idContent/exercises')
  async getExercisesByContent(@Param('idContent') idContent: string) {
    return this.contentService.getExercisesByContent(idContent);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getContent() {
    return this.contentService.getContent();
  }
}