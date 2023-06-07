import { Controller, Get, Logger, Query, ValidationPipe } from '@nestjs/common';
import { TableService } from './table.service';
import { GetTablesFilterDto } from './dto/get-table-limit.dto';

@Controller('table')
export class TableController {
  private logger = new Logger('TablesController');
  constructor(private tableService: TableService) {}

  @Get()
  getTables(
    @Query(ValidationPipe) filterDto: GetTablesFilterDto,
  ): Promise<any> {
    return this.tableService.GetTables(Number.parseInt(filterDto.limit));
  }
}
