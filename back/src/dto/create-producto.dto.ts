import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Ensalada César' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Precio del producto', example: 10.99 })
  @IsNumber()
  precio: number;

  @ApiProperty({ description: 'Descripción del producto', example: 'Deliciosa ensalada con pollo y aderezo César' })
  @IsString()
  @IsNotEmpty()
  descripcion: string; // Descripción del producto

  @ApiProperty({ description: 'URL de la imagen del producto', example: 'https://ejemplo.com/imagen.jpg', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string; // Campo opcional para la URL de la imagen
}
