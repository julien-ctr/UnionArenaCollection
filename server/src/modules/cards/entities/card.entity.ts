import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rarity } from './rarity.entity'; 
import { Extension } from './extension.entity'; 

@Entity('Card')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  // Foreign key
  @ManyToOne(() => Rarity, { eager: true })
  @JoinColumn({ name: 'rarityId' }) // Name of the foreign key column in the database
  rarity: Rarity;

  // Foreign key
  @ManyToOne(() => Extension, { eager: true })
  @JoinColumn({ name: 'extensionId' }) // Name of the foreign key column in the database
  extension: Extension;

  @Column({ length: 50 })
  color: string;

  @Column({ length: 50 })
  cardCode: string;

  @Column()
  alt: number;

  @Column({ length: 200 })
  imagePath: string;

  @Column({ length: 400 })
  description: string;

}