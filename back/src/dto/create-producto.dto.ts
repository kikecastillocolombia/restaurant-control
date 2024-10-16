import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
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
}
