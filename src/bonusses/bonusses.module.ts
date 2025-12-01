import { Module } from '@nestjs/common';
import { BonusesService } from './bonusses.service';
import { BonussesController } from './bonusses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fight } from 'src/fights/entities/fight.entity';
import { Fighter } from 'src/fighters/entities/fighter.entity';
import { Event } from 'src/events/entities/event.entity';
import { Bonus } from './entities/bonuss.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Fight, Fighter, Event, Bonus])],
  controllers: [BonussesController],
  providers: [BonusesService],
})
export class BonussesModule {}
