import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Sopa de Tomate', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ description: 'Precio del producto', example: 9.99, required: false })
  @IsNumber()
  @IsOptional()
  precio?: number;

  @ApiProperty({ description: 'Descripción del producto', example: 'Sopa caliente de tomate fresco', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string; // Descripción del producto

  @ApiProperty({ description: 'URL de la imagen del producto', example: 'https://ejemplo.com/imagen.jpg', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string; // Campo opcional para la URL de la imagen
}
