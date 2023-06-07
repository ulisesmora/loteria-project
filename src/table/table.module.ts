import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { SingleCardModule } from 'src/single-card/single-card.module';

@Module({
  imports: [TypeOrmModule.forFeature([Table]), SingleCardModule],
  exports: [TableService],
  providers: [TableService],
  controllers: [TableController],
})
export class TableModule {}
