import { IsString, IsDateString, IsOptional, MaxLength } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  location?: string;
}

