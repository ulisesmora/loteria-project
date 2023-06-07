import { SingleCard } from 'src/single-card/single-card.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Table extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  combination: string;
  @OneToMany((type) => SingleCard, (card) => card.table)
  card: SingleCard[];
}
