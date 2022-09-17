import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EndBossraidDto, EnterBossraidDto } from './dto';

@Injectable()
export class BossraidsService {
  constructor(private readonly prisma: PrismaService) {}

  async getState(id: number) {
    try {
      const boss = await this.prisma.bossRaid.findUnique({
        where: { id },
        select: { canEnter: true, enteredUserId: true },
      });
      return boss;
    } catch (err) {
      throw new NotFoundException('보스레이드 상태를 조회하지 못했습니다.');
    }
  }

  async enterBossraid(enterBossraidDto: EnterBossraidDto) {
    const { level, userId } = enterBossraidDto;
    try {
      return await this.prisma.bossRaid.update({
        where: { level },
        data: { enteredUserId: userId, canEnter: false },
      });
    } catch (err) {
      throw new NotFoundException('보스레이드를 시작하지 못했습니다.');
    }
  }

  async endrBossraid(endBossraidDto: EndBossraidDto) {
    const { score, userId } = endBossraidDto;
    // 레이드 제한시간 지났는지 확인
    // userId와 저장된 enteredUserId가 같은지 확인
    // history에 저장 : upsert 사용
    // redis에 랭킹
  }

  async getRanking(level: number) {
    // redis에서 받아오기
  }
}
