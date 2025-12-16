import { Event } from "src/events/entities/event.entity";
import { FightStats } from "src/fight-stats/entities/fight-stats.entity";
import { Fighter } from "src/fighters/entities/fighter.entity";
import { FightStatus } from "src/types/fight";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fighter)
  fighterA: Fighter;

  @ManyToOne(() => Fighter)
  fighterB: Fighter;

  @OneToMany(() => FightStats, stats => stats.fight)
  stats: FightStats[];

  @ManyToOne(() => Fighter, { nullable: true })//null if status is scheduled
  winner?: Fighter; //winner fighter, or null if Draw/No Contest. 

  @Column({nullable: true})
  method?: string;

  @Column({nullable: true})
  rounds?: number;

  @ManyToOne(() => Event, event => event.fights)
  event: Event;

  @Column({ type: 'enum', enum: FightStatus, default: FightStatus.SCHEDULED })
  status: FightStatus;
}

