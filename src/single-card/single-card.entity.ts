import { Table } from 'src/table/table.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SingleCard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  image: string;
  @ManyToOne((type) => Table, (table) => table.card, { eager: false })
  table: Table;
}
