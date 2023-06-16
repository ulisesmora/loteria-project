import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SingleCard } from 'src/single-card/single-card.entity';
import { Table } from 'src/table/table.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'host.docker.internal',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'loteria',
  autoLoadEntities: true,
  synchronize: true,
  entities: [SingleCard, Table],
};
