import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlatoDto {
  @ApiProperty({ description: 'Nombre del plato', example: 'Sopa de Tomate', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ description: 'Precio del plato', example: 9.99, required: false })
  @IsNumber()
  @IsOptional()
  precio?: number;

  @ApiProperty({ description: 'Descripción del plato', example: 'Sopa caliente de tomate fresco', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string; // Descripción del plato
}
