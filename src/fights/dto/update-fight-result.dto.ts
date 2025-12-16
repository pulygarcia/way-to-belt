import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { FightStatsDto } from "src/fight-stats/entities/dto/fight-stats.dto";
import { FightStatus } from "src/types/fight";

export class UpdateFightResultDto {
  @IsNotEmpty()
  @IsNumber()
  winnerId: number; 

  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  @IsNumber()
  rounds: number;
  
  //status should be FINALIZED when updating result
  @IsNotEmpty()
  @IsEnum(FightStatus)
  status: FightStatus.FINALIZED; 
  
  //stats must be provided when updating result
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FightStatsDto)
  stats: FightStatsDto[]; 
}