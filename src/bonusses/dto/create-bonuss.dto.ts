import { IsEnum, IsInt } from 'class-validator';
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
  amount: number;
}

