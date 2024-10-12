import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importa ApiProperty

export class CreateDetallePedidoDto {
  @ApiProperty({ description: 'Cantidad del plato en el pedido', example: 2 })
  @IsInt()
  @IsNotEmpty()
  cantidad: number; // Cantidad del plato en el pedido

  @ApiProperty({ description: 'ID del plato asociado', example: 1 })
  @IsInt()
  @IsNotEmpty()
  platoId: number; // ID del plato asociado

  @ApiProperty({ description: 'ID del pedido al que pertenece el detalle', example: 1 })
  @IsInt()
  @IsNotEmpty()
  pedidoId: number; // ID del pedido al que pertenece el detalle
}
