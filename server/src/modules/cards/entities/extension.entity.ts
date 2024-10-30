import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Series } from '../../series/entities/series.entity';

@Entity('Extension')
export class Extension {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 }) 
  name: string;

  @Column()
  seriesId: number;

  // Foreign key
  @ManyToOne(() => Series, { eager: true })
  @JoinColumn({ name: 'seriesId' }) // Name of the foreign key column in the database
  series: Series;
}