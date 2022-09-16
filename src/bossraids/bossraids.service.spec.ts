import { Test, TestingModule } from '@nestjs/testing';
import { BossraidsService } from './bossraids.service';

describe('BossraidsService', () => {
  let service: BossraidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BossraidsService],
    }).compile();

    service = module.get<BossraidsService>(BossraidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
