import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from './entities/card.entity';
import { Rarity } from './entities/rarity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Rarity]),
  ],
  controllers: [CardsController],
  providers: [
    CardsService,
  ],
  exports: [CardsService],
})
export class CardsModule {}
