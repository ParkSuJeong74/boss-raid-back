import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
}

export class getUserResponseDto {
  score: unknown;
  BossRaidHistory: {
    record_id: number;
    score: number;
    enterTime: Date;
    endTime: Date;
  }[];
}
