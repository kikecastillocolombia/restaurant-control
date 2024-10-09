import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { EstadoPedido } from '../enums/estado-pedido.enum'; // Importa el enum

export class CreatePedidoDto {
  @IsDateString()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  estado: EstadoPedido; // Cambiar a tipo EstadoPedido

  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @IsInt()
  @IsNotEmpty()
  mesaId: number;
}
