import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMesaDto {
  @IsNotEmpty()
  @IsNumber()
  numero: number;
}
