import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [RedisModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
