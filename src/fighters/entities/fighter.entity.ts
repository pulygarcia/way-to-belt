import { Bonus } from 'src/bonusses/entities/bonuss.entity';
import { FightStats } from 'src/fight-stats/entities/fight-stats.entity';
import { Fight } from 'src/fights/entities/fight.entity';
import { WeightClass } from 'src/types/fighter';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export const weights = [
  'Peso Mosca', 'Peso Gallo',  'Peso Pluma', 'Peso Ligero',
  'Peso Wélter', 'Peso Medio', 'Peso Semipesado', 'Peso Pesado'
]

@Entity()
export class Fighter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  nickname: string;

  @Column()
  nationality: string;

  @Column({ type: 'enum', enum: weights})
  weightClass: WeightClass;

  @Column('int')
  height: number;//cm...

  @Column('int')
  reach: number;//cm...

  @Column('int')
  age: number;

  @Column('int')
  wins: number;

  @Column('int')
  losses: number;

  @Column('int')
  draws: number;

  @OneToMany(() => Bonus, bonus => bonus.fighter)
  bonuses: Bonus[];

  @OneToMany(() => Fight, fight => fight.fighterA)
  fightsAsA: Fight[];

  @OneToMany(() => Fight, fight => fight.fighterB)
  fightsAsB: Fight[];

  @OneToMany(() => FightStats, fightStats => fightStats.fighter)
  fightStats: FightStats[];

}

