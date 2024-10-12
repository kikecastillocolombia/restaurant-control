import { IsEnum, IsOptional, IsInt } from 'class-validator';
import { EstadoPedido } from '../enums/estado-pedido.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePedidoDto {
  @ApiProperty({ enum: EstadoPedido, description: 'Nuevo estado del pedido', required: false })
  @IsOptional()
  @IsEnum(EstadoPedido)
  estado?: EstadoPedido;

  @ApiProperty({ description: 'ID del usuario que actualiza el pedido', required: false, example: 1 })
  @IsOptional()
  @IsInt()
  usuarioId?: number;
}
