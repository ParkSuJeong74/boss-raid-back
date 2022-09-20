import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { BossraidsController } from './bossraids.controller';
import { BossraidsService } from './bossraids.service';

@Module({
  imports: [HttpModule, RedisModule],
  providers: [BossraidsService],
  controllers: [BossraidsController],
})
export class BossraidsModule {}
