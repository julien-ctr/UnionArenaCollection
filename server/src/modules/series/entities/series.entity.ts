import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('Series')
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;
}