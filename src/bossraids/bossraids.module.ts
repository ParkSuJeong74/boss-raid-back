import { Module } from '@nestjs/common';
import { BossraidsService } from './bossraids.service';
import { BossraidsController } from './bossraids.controller';

@Module({
  providers: [BossraidsService],
  controllers: [BossraidsController]
})
export class BossraidsModule {}
