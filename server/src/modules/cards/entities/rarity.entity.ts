import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('Rarity')
export class Rarity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  acronym: string;
}