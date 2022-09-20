import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BossraidsService } from './bossraids.service';
import { EndBossraidDto, EnterBossraidDto } from './dto';

@Controller('bossraids')
export class BossraidsController {
  constructor(private readonly bossraidsService: BossraidsService) {}

  @HttpCode(200)
  @Get('state/:boss_id')
  @ApiOperation({
    summary: '현재 상태 조회 API',
    description: '보스레이드 현재 상태를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '현재 상태 조회 성공',
  })
  @ApiParam({ name: 'boss_id', required: true, description: '보스 아이디' })
  async getState(@Param('boss_id') boss_id: number) {
    return await this.bossraidsService.getState(boss_id);
  }

  @HttpCode(201)
  @Post('enter')
  @ApiOperation({
    summary: '보스레이드 시작 API',
    description: '보스레이드를 시작한다.',
  })
  @ApiResponse({
    status: 201,
    description: '보스레이드 시작 성공',
  })
  @ApiBody({ type: EnterBossraidDto })
  async enterBossraid(@Body() enterBossraidDto: EnterBossraidDto) {
    return await this.bossraidsService.enterBossraid(enterBossraidDto);
  }

  @HttpCode(201)
  @Post('end')
  @ApiOperation({
    summary: '보스레이드 종료 API',
    description: '보스레이드를 종료한다.',
  })
  @ApiResponse({
    status: 201,
    description: '보스레이드 종료 성공',
  })
  @ApiBody({ type: EndBossraidDto })
  async endrBossraid(@Body() endBossraidDto: EndBossraidDto) {
    return await this.bossraidsService.endBossraid(endBossraidDto);
  }

  @HttpCode(200)
  @Get('rankings')
  @ApiOperation({
    summary: '랭킹 조회 API',
    description: '보스레이드 랭킹를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '랭킹 조회 성공',
  })
  async getRanking() {
    return await this.bossraidsService.getRanking();
  }
}
