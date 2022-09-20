import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BossraidsController } from './bossraids.controller';
import { BossraidsService } from './bossraids.service';

@Module({
  imports: [HttpModule],
  providers: [BossraidsService],
  controllers: [BossraidsController],
})
export class BossraidsModule {}
