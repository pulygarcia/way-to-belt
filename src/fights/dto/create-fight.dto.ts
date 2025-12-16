import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, ValidateNested } from "class-validator";
import { FightStatsDto } from "src/fight-stats/entities/dto/fight-stats.dto";
import { FightStatus } from "src/types/fight";

export class CreateFightDto {
  @IsInt()
  fighterAId: number;

  @IsInt()
  fighterBId: number;

  @IsOptional()
  @IsEnum(FightStatus)
  status?: FightStatus;

  @IsOptional()
  @IsNumber()
  winnerId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  method?: string;

  @IsOptional()
  @IsInt()
  @Max(5)
  rounds?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FightStatsDto)
  stats?: FightStatsDto[]; //to allow create past fights

  @IsNotEmpty()
  @IsInt()
  eventId: number;
}

