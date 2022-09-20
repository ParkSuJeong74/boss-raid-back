import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EndBossraidDto, EnterBossraidDto } from './dto';

@Injectable()
export class BossraidsService {
  constructor(private readonly prisma: PrismaService) {}

  async getState(boss_id: number) {
    try {
      const boss = await this.prisma.bossRaid.findUnique({
        where: { boss_id },
        select: { canEnter: true, enteredUserId: true, limitMSecond: true },
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
    try {
      const [boss, bossRaidHistory] = await this.prisma.$transaction([
        this.prisma.bossRaid.update({
          where: { boss_id },
          data: { enteredUserId: user_id, canEnter: false },
          select: { level: true, totalScore: true },
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

  async endrBossraid(endBossraidDto: EndBossraidDto) {
    const { score, boss_id, user_id, record_id } = endBossraidDto;

    const boss = await this.getState(boss_id);
    if (boss.enteredUserId !== user_id) {
      throw new ForbiddenException(
        '저장된 유저와 입력받은 유저가 일치하지 않습니다.',
      );
    }

    const currentTime = new Date(Date.now());
    const bossraidHistory = await this.getBossRaidHistory(record_id);

    const raidTimeout =
      currentTime.getTime() - bossraidHistory.enterTime.getTime() >
      boss.limitMSecond;

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
      // redis에 랭킹
    } catch (err) {
      throw new NotFoundException('보스레이드를 종료하지 못했습니다.');
    }
  }

  async getRanking() {
    // redis에서 받아오기
  }
}
