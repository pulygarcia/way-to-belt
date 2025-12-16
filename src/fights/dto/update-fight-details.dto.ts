// fights/dto/update-fight-details.dto.ts

import {  IsEnum, IsInt, IsOptional} from "class-validator";
import { FightStatus } from "src/types/fight";

export class UpdateFightDetailsDto {
    @IsOptional()
    @IsInt()
    fighterAId?: number; //optional to allow partial updates

    @IsOptional()
    @IsInt()
    fighterBId?: number;

    @IsOptional()
    @IsInt()
    eventId?: number; //if event needs to be changed

    @IsOptional()
    @IsEnum(FightStatus)
    status?: FightStatus; 

    //exclude winnerId, method, rounds and stats to avoid conflicts with updateRESULT
}
