import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name } = createUserDto;
    try {
      const user = await this.prisma.user.create({ data: { name } });
      return user;
    } catch (err) {
      throw new NotFoundException('유저를 생성하지 못했습니다.');
    }
  }

  async getUser(user_id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { user_id },
        select: {
          BossRaidHistory: {
            select: {
              record_id: true,
              score: true,
              enterTime: true,
              endTime: true,
            },
          },
        },
      });
      const score = await this.redisService.getScore(user_id.toString());
      const result = { ...user, score };
      return result;
    } catch (err) {
      throw new NotFoundException('유저를 조회하지 못했습니다.');
    }
  }
}
