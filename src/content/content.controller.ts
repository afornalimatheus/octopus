import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { CreateContentDto } from './dto/content-dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CreateContentDto) {
    return this.contentService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getContent() {
    return this.contentService.getContent();
  }
}
