import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { plainToClass } from 'class-transformer';
import { SingleCard } from './single-card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as allCards from './generateCards/generateCard.json';

@Injectable()
export class SingleCardService {
  constructor(
    @InjectRepository(SingleCard)
    private readonly cardRepository: Repository<SingleCard>,
  ) {}

  public async CreateCard(createCardDto: CreateCardDto): Promise<SingleCard> {
    const result = plainToClass(SingleCard, createCardDto);
    try {
      await result.save();
      return result;
    } catch (error) {
      console.log(error.code);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Card cant´t create because exist');
      }
      return error;
    }
  }

  public async GetCards(): Promise<SingleCard[]> {
    const cards = await this.cardRepository.find();
    return cards;
  }

  public async CreateAllCards(): Promise<SingleCard[]> {
    const cards: SingleCard[] = [];
    for (const card of allCards) {
      const result = await this.CreateCard(card);
      cards.push(result);
    }
    return cards;
  }
}
