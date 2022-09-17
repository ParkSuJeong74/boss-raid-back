import { IsNumber } from 'class-validator';

export class EnterBossraidDto {
  @IsNumber()
  level: number;

  @IsNumber()
  userId: number;
}

export class EndBossraidDto {
  @IsNumber()
  score: number;

  @IsNumber()
  userId: number;
}
