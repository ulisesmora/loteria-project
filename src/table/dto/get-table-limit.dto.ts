import {
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsString,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class GetTablesFilterDto {
  @IsNumberString()
  limit: string;
}
