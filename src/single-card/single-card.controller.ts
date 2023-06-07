import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SingleCardService } from './single-card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { SingleCard } from './single-card.entity';

@Controller('single-card')
export class SingleCardController {
  private logger = new Logger('CouponController');
  constructor(private singleCardService: SingleCardService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCard(@Body() createCardDto: CreateCardDto): Promise<SingleCard> {
    this.logger.verbose(
      `creating a new card Data: ${JSON.stringify(createCardDto)}`,
    );
    return this.singleCardService.CreateCard(createCardDto);
  }

  @Post('/createAllCards')
  @UsePipes(ValidationPipe)
  createCards(): Promise<SingleCard[]> {
    this.logger.verbose(`creating cards`);
    return this.singleCardService.CreateAllCards();
  }

  @Get()
  getCards(): Promise<SingleCard[]> {
    return this.singleCardService.GetCards();
  }
}
