import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validation } from './commons/utils';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { BossraidsModule } from './bossraids/bossraids.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'development'
          ? '.development.env'
          : '.env',
      isGlobal: true,
      validationSchema: validation,
    }),
    PrismaModule,
    UsersModule,
    BossraidsModule,
    RedisModule,
  ],
})
export class AppModule {}
