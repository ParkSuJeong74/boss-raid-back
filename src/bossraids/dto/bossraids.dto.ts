import { IsBoolean, IsNumber } from 'class-validator';

export class EnterBossraidDto {
  @IsNumber()
  boss_id: number;

  @IsNumber()
  user_id: number;
}

export class EnterBossraidResponseDto {
  @IsNumber()
  record_id: number;

  @IsNumber()
  level: number;
}

export class EndBossraidDto {
  @IsNumber()
  boss_id: number;

  @IsNumber()
  level: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  record_id: number;
}

export class EndBossraidResponseDto {
  @IsNumber()
  level: number;

  @IsNumber()
  score: number;
}

export class getRankingResponseDto {
  @IsNumber()
  user: number;

  @IsNumber()
  score: number;
}

export class getStateResponseDto {
  @IsBoolean()
  canEnter: boolean;

  @IsNumber()
  enteredUserId: number;
}
