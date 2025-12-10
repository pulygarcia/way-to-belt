import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateFightDto {
  @IsInt()
  fighterAId: number;

  @IsInt()
  fighterBId: number;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  result?: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsInt()
  rounds?: number;

  @IsInt()
  eventId: number;
}

