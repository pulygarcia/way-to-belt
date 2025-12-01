import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fighter } from 'src/fighters/entities/fighter.entity';
import { Fight } from 'src/fights/entities/fight.entity';
import { Event } from 'src/events/entities/event.entity';

export enum BonusType {
  FIGHT_OF_THE_NIGHT = 'Fight of the Night',
  PERFORMANCE = 'Performance of the Night',
  KO = 'KO of the Night',
  SUBMISSION = 'Submission of the Night',
}

@Entity()
export class Bonus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BonusType,
  })
  type: BonusType;

  @ManyToOne(() => Fighter)
  fighter: Fighter;

  @ManyToOne(() => Fight)
  fight: Fight;

  @ManyToOne(() => Event)
  event: Event;

  @Column({ type: 'int', default: 50000 })
  amount: number; //50.000
}


