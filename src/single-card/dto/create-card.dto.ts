import { IsIn, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { SingleCardNames } from '../single-card.names';

export class CreateCardDto {
  @IsNotEmpty()
  @IsIn(Object.values(SingleCardNames))
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsUrl()
  image: string;
}
