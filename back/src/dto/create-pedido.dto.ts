import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { EstadoPedido } from '../enums/estado-pedido.enum';
import { ApiProperty } from '@nestjs/swagger'; // Importa ApiProperty

export class CreatePedidoDto {
  @ApiProperty({ type: String, description: 'Fecha del pedido en formato ISO', example: '2024-10-11T14:30:00Z' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ enum: EstadoPedido, description: 'Estado del pedido', example: EstadoPedido.PENDIENTE })
  @IsString()
  @IsNotEmpty()
  estado: EstadoPedido;

  @ApiProperty({ description: 'ID del usuario que crea el pedido', example: 1 })
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({ description: 'ID de la mesa donde se realiza el pedido', example: 1 })
  @IsInt()
  @IsNotEmpty()
  mesaId: number;
}
