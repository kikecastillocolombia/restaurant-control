import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMesaDto {
  @ApiProperty({ description: 'Número de la mesa', example: 1 }) // Documentar la propiedad
  @IsNotEmpty()
  @IsNumber()
  numero: number;
}
