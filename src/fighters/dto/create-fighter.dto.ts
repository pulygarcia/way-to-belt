import { IsString, IsInt, Min, Max, IsEnum, MaxLength } from 'class-validator';
import { WeightClass } from 'src/types/fighter';
import { weights } from '../entities/fighter.entity';

export class CreateFighterDto {
  @IsString()
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MaxLength(30)
  lastName: string;

  @IsString()
  @MaxLength(30)
  nickname: string;

  @IsString()
  @MaxLength(30)
  nationality: string;

  @IsEnum(weights, { message: 'La categoría de peso no es válida' })
  weightClass: WeightClass;

  @IsInt()
  @Min(140, { message: 'Altura mínima 140 cm' })
  @Max(220, { message: 'Altura máxima 220 cm' })
  height: number;

  @IsInt()
  @Min(140, { message: 'Alcance mínimo 140 cm' })
  @Max(230, { message: 'Alcance máximo 230 cm' })
  reach: number;

  @IsInt()
  @Min(18, { message: 'La edad mínima es 18' })
  @Max(50, { message: 'La edad máxima es 50' })
  age: number;

  @IsInt()
  @Min(0)
  wins: number;

  @IsInt()
  @Min(0)
  losses: number;

  @IsInt()
  @Min(0)
  draws: number;
}
