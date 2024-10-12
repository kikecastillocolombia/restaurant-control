import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importa ApiProperty

export class DetallePedidoResponseDto {
  @ApiProperty({ description: 'ID del detalle de pedido', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Cantidad del plato en el pedido', example: 2 })
  @IsInt()
  @IsNotEmpty()
  cantidad: number; // Cantidad del plato en el pedido

  @ApiProperty({ description: 'ID del plato asociado', example: 1 })
  @IsInt()
  @IsNotEmpty()
  platoId: number; // ID del plato asociado

  // Puedes incluir más propiedades relacionadas con el plato, si lo deseas.
}
