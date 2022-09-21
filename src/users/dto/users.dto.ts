import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
}

export class CreateUserResponseDto {
  @IsNumber()
  userId: number;
}

export class getUserResponseDto {
  @IsNumber()
  score: number;

  @IsArray()
  BossRaidHistory: {
    record_id: number;
    score: number;
    enterTime: Date;
    endTime: Date;
  }[];
}
