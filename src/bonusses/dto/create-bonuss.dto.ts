import { IsEnum, IsInt, Max } from 'class-validator';
import { BonusType } from '../entities/bonuss.entity';


export class CreateBonussDto {
  @IsEnum(BonusType)
  type: BonusType;

  @IsInt()
  fighterId: number;

  @IsInt()
  fightId: number;

  @IsInt()
  eventId: number;

  @IsInt()
  @Max(100000)
  amount: number;
}

