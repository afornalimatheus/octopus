import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserScore } from './dto/ranking-dto';

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  async getRanking(): Promise<UserScore[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        exp: 'desc',
      },
    });

    if (!users) {
      throw new Error('No users found');
    }

    const userScores: UserScore[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      exp: user.exp,
      life: user.life,
    }));

    return userScores;
  }
}
