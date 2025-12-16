// src/fight-stats/entities/fight-stats.entity.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Fight } from 'src/fights/entities/fight.entity';
import { Fighter } from 'src/fighters/entities/fighter.entity';

@Entity()
@Unique(['fight', 'fighter']) //only one stats record per fighter per fight.
export class FightStats {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Fight, fight => fight.stats)
  fight: Fight;

  @ManyToOne(() => Fighter, fighter => fighter.fightStats)
  fighter: Fighter;

  @Column({ default: 0 })
  knockdowns: number;

  @Column({ default: 0 })
  strikesLanded: number; 

  @Column({ default: 0 })
  strikesAttempted: number; 

  @Column({ default: 0 })
  takedownsLanded: number;

  @Column({ default: 0 })
  takedownsAttempted: number; 

  @Column({ default: false })
  isWinner: boolean;

  @Column({ nullable: true })
  roundFinished?: number; 
}