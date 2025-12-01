import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightsController } from './fights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fight } from './entities/fight.entity';
import { Fighter } from 'src/fighters/entities/fighter.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Fight, Fighter])],
  controllers: [FightsController],
  providers: [FightsService],
})
export class FightsModule {}
