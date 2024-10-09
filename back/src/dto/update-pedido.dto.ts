import { IsEnum, IsOptional } from 'class-validator';
import { EstadoPedido } from '../enums/estado-pedido.enum';

export class UpdatePedidoDto {
  @IsOptional()
  @IsEnum(EstadoPedido) // Validación para que sea uno de los valores del enum
  estado?: EstadoPedido;

  @IsOptional()
  usuarioId?: number; // Incluir usuarioId
}