import {  
    IsBoolean, 
    IsNotEmpty, 
    IsInt, 
    Min, 
} from 'class-validator';

export class FightStatsDto {
  
  @IsNotEmpty()
  @IsInt() 
  @Min(1) 
  fighterId: number; 

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  knockdowns: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  strikesLanded: number; 

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  strikesAttempted: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  takedownsLanded: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  takedownsAttempted: number;

  @IsNotEmpty()
  @IsBoolean()
  isWinner: boolean;
}