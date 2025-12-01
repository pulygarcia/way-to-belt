import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fight } from 'src/fights/entities/fight.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  location?: string;

  @OneToMany(() => Fight, fight => fight.event)
  fights: Fight[];
}

