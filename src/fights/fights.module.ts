import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightsController } from './fights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fight } from './entities/fight.entity';
import { Fighter } from 'src/fighters/entities/fighter.entity';
import { Event } from 'src/events/entities/event.entity';
import { FightStats } from 'src/fight-stats/entities/fight-stats.entity';
import { FightSubscriber } from './suscribers/fight.suscriber';

@Module({
  imports:[TypeOrmModule.forFeature([Fight, Fighter, Event, FightStats])],
  controllers: [FightsController],
  providers: [FightsService, FightSubscriber],
})
export class FightsModule {}
