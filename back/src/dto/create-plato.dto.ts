import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlatoDto {
  @ApiProperty({ description: 'Nombre del plato', example: 'Ensalada César' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Precio del plato', example: 10.99 })
  @IsNumber()
  precio: number;

  @ApiProperty({ description: 'Descripción del plato', example: 'Deliciosa ensalada con pollo y aderezo César' })
  @IsString()
  @IsNotEmpty()
  descripcion: string; // Descripción del plato
}
