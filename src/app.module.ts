import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SingleCardModule } from './single-card/single-card.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './databaseconfig/typeorm.config';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SingleCardModule,
    TableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
