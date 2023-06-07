import { ConflictException, Injectable } from '@nestjs/common';
import { Table } from './table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SingleCardNames } from 'src/single-card/single-card.names';
import { SingleCardService } from '../single-card/single-card.service';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly cardRepository: Repository<Table>,
    private readonly singleCardService: SingleCardService,
  ) {}

  *generarCombinaciones(
    elements: any[],
    r: number,
    quantity: number,
  ): Generator<any[], void, unknown> {
    function* combRecursiva(
      actualElements: any[],
      actualCombination: any[],
      startIndex: number,
    ): Generator<any[], void, unknown> {
      if (actualCombination.length === r) {
        yield actualCombination.slice();
        return;
      }

      for (let i = startIndex; i < actualElements.length; i++) {
        actualCombination.push(actualElements[i]);
        yield* combRecursiva(actualElements, actualCombination, i + 1);
        actualCombination.pop();
      }
    }

    yield* combRecursiva(elements, [], 0);
  }

  public async GetTables(limit: number) {
    if (limit >= 21094923659355) {
      throw new ConflictException('combinations overlimit');
    }
    const actualElements = await this.cardRepository.find();
    if (limit <= actualElements.length) {
      return actualElements;
    }
    const elementos = [...Array(54).keys()].map((i) => i + 1);
    const r = 16;
    const cantidadSolicitada = limit;

    const generador = this.generarCombinaciones(
      elementos,
      r,
      cantidadSolicitada,
    );
    for (let i = 0; i < cantidadSolicitada; i++) {
      const combinacion = generador.next().value;
      const newcomb = combinacion as number[];
      const convert = newcomb.map((num) => SingleCardNames[num]);
      if (i >= actualElements.length) {
        const element = new Table();
        element.combination = convert.toString();
        await element.save();
      }
    }

    return await this.cardRepository.find();
  }
}
