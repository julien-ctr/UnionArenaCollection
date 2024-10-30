import { Controller, Get, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  getAllCards(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get('extension/:name')
  getCardsByExtension(@Param('name') extensionName: string): Promise<Card[]> {
    return this.cardsService.findByExtension(extensionName);
  }

  @Get('series/:name')
  getCardsBySeries(@Param('name') seriesName: string): Promise<Card[]> {
    return this.cardsService.findBySeries(seriesName);
  }
}
