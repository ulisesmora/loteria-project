import { Module } from '@nestjs/common';
import { SingleCardService } from './single-card.service';
import { SingleCardController } from './single-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingleCard } from './single-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SingleCard])],
  providers: [SingleCardService],
  controllers: [SingleCardController],
  exports: [SingleCardService],
})
export class SingleCardModule {}
