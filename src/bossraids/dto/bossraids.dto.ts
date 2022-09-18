import { IsNumber } from 'class-validator';

export class EnterBossraidDto {
  @IsNumber()
  boss_id: number;

  @IsNumber()
  user_id: number;
}

export class EndBossraidDto {
  @IsNumber()
  boss_id: number;

  @IsNumber()
  score: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  record_id: number;
}
