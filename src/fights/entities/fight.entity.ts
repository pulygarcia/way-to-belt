import { Event } from "src/events/entities/event.entity";
import { Fighter } from "src/fighters/entities/fighter.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fighter)
  fighterA: Fighter;

  @ManyToOne(() => Fighter)
  fighterB: Fighter;

  @Column()
  date: Date;

  @Column({nullable: true})
  result?: string;

  @Column({nullable: true})
  method?: string;

  @Column({nullable: true})
  rounds?: number;

  @ManyToOne(() => Event, event => event.fights)
  event: Event;
}

