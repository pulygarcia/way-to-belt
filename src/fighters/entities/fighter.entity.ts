import { WeightClass } from 'src/types/fighter';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

