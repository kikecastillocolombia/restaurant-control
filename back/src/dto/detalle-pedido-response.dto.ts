import { IsInt, IsNotEmpty } from 'class-validator';

export class DetallePedidoResponseDto {
  @IsInt()
  id: number;

  @IsInt()
  @IsNotEmpty()
  cantidad: number; // Cantidad del plato en el pedido

  @IsInt()
  @IsNotEmpty()
  platoId: number; // ID del plato asociado

  // Puedes incluir más propiedades relacionadas con el plato, si lo deseas.
}
