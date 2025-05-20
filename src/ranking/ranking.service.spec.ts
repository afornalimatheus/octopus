import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { PrismaService } from 'prisma/prisma.service';
class MockPrismaService {
  user = {
    findMany: jest.fn().mockResolvedValue([
      { id: 'cmanofs6l0001qj15mqfthsc2', name: 'Fred', exp: 100, life: 3 },
      { id: 'cmaw7g5uf0000qj1jpfen7tnu', name: 'Vilma', exp: 200, life: 2 },
    ]),
  };
}

describe('RankingService', () => {
  let service: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        { provide: PrismaService, useClass: MockPrismaService },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of user scores', async () => {
    const result = [
      { id: 'cmanofs6l0001qj15mqfthsc2', name: 'Fred', exp: 100, life: 3 },
      { id: 'cmaw7g5uf0000qj1jpfen7tnu', name: 'Vilma', exp: 200, life: 2 },
    ];

    jest.spyOn(service, 'getRanking').mockResolvedValue(result);

    expect(await service.getRanking()).toEqual(result);
  });
});
