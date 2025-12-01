import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateFightDto {
  @IsInt()
  fighterAId: number;

  @IsInt()
  fighterBId: number;

  @IsDateString()
  date: string;

  @IsString()
  result: string;

  @IsString()
  method: string;

  @IsInt()
  rounds: number;
}

