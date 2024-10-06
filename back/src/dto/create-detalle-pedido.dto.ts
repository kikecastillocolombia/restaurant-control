import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDetallePedidoDto {
  @IsInt()
  @IsNotEmpty()
  cantidad: number; // Cantidad del plato en el pedido

  @IsInt()
  @IsNotEmpty()
  platoId: number; // ID del plato asociado

  @IsInt()
  @IsNotEmpty()
  pedidoId: number; // ID del pedido al que pertenece el detalle
}
