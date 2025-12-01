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

  @Column()
  result: string;

  @Column()
  method: string;

  @Column()
  rounds: number;

  @ManyToOne(() => Event, event => event.fights)
  event: Event;
}

