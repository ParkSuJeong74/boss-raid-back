import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { EndBossraidDto, EnterBossraidDto } from './dto';

@Injectable()
export class BossraidsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
  ) {}

  async getState(boss_id: number) {
    try {
      const boss = await this.prisma.bossRaid.findUnique({
        where: { boss_id },
        select: { canEnter: true, enteredUserId: true },
      });
      return boss;
    } catch (err) {
      throw new NotFoundException('보스레이드 상태를 조회하지 못했습니다.');
    }
  }

  async getBossRaidHistory(record_id: number) {
    try {
      return await this.prisma.bossRaidHistory.findUnique({
        where: { record_id },
      });
    } catch (err) {
      throw new NotFoundException('보스레이드 기록을 조회하지 못했습니다.');
    }
  }

  async enterBossraid(enterBossraidDto: EnterBossraidDto) {
    const { boss_id, user_id } = enterBossraidDto;
    await this.redisService.setRank(user_id.toString(), 0);

    try {
      const [boss, bossRaidHistory] = await this.prisma.$transaction([
        this.prisma.bossRaid.update({
          where: { boss_id },
          data: { enteredUserId: user_id, canEnter: false },
          select: { level: true },
        }),
        this.prisma.bossRaidHistory.create({
          data: { user_id },
          select: { record_id: true },
        }),
      ]);

      const result = { ...boss, ...bossRaidHistory };
      return result;
    } catch (err) {
      throw new NotFoundException('보스레이드를 시작하지 못했습니다.');
    }
  }

  async endBossraid(endBossraidDto: EndBossraidDto) {
    const { level, boss_id, user_id, record_id } = endBossraidDto;
    const data = await this.getStaticData();
    const limitSecond = data.bossRaidLimitSeconds * 1000;
    const score = data.bossRaids[0].levels[level].score;

    const boss = await this.getState(boss_id);
    if (boss.enteredUserId !== user_id) {
      throw new ForbiddenException(
        '저장된 유저와 입력받은 유저가 일치하지 않습니다.',
      );
    }

    const currentTime = new Date(Date.now());
    const bossraidHistory = await this.getBossRaidHistory(record_id);

    const raidTimeout =
      currentTime.getTime() - bossraidHistory.enterTime.getTime() > limitSecond;

    if (raidTimeout) {
      throw new ForbiddenException('제한시간을 초과한 레이드입니다.');
    }

    try {
      await this.prisma.$transaction([
        this.prisma.bossRaidHistory.update({
          where: { record_id },
          data: { endTime: currentTime, score, clear: true },
        }),
        this.prisma.bossRaid.update({
          where: { boss_id },
          data: { canEnter: true, enteredUserId: null },
        }),
      ]);

      await this.redisService.setRank(user_id.toString(), score);
    } catch (err) {
      throw new NotFoundException('보스레이드를 종료하지 못했습니다.');
    }
  }

  async getRanking() {
    return await this.redisService.getRankings();
  }

  async getStaticData() {
    try {
      const res = await this.httpService.get(
        `https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json`,
      );
      const data = (await lastValueFrom(res)).data;
      return data;
    } catch (err) {
      throw new NotFoundException(
        '보스레이드 정적 데이터를 불러오지 못했습니다.',
      );
    }
  }
}
