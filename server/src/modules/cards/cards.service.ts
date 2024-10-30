import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
  ) {}

  async findAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }

  async findByExtension(extensionName: string): Promise<Card[]> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .innerJoinAndSelect('card.extension', 'extension')
      .where('extension.name = :name')
      .setParameters({ name: extensionName })
      .getMany();
  }

  async findBySeries(seriesName: string): Promise<Card[]> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .innerJoinAndSelect('card.extension', 'extension')
      .innerJoinAndSelect('extension.series', 'series')
      .where('series.name = :name')
      .setParameters({ name: seriesName })
      .getMany();
  }
}
