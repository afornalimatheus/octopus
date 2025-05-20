import { Controller, Get, UseGuards } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getRanking() {
    return this.rankingService.getRanking();
  }
}
