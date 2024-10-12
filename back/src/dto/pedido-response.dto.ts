import { IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { DetallePedidoResponseDto } from './detalle-pedido-response.dto';
import { CuentaResponseDto } from './cuenta-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PedidoResponseDto {
  @ApiProperty({ description: 'ID del pedido', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Fecha del pedido en formato ISO', example: '2024-10-11T14:30:00Z' })
  @IsNotEmpty()
  fecha: Date;

  @ApiProperty({ description: 'Estado del pedido', example: 'pendiente' })
  @IsNotEmpty()
  estado: string; // 'pendiente', 'listo', 'facturado'

  @ApiProperty({ description: 'ID del mesero que registró el pedido', example: 1 })
  @IsInt()
  usuarioId: number;

  @ApiProperty({ description: 'ID de la mesa donde se realizó el pedido', example: 1 })
  @IsInt()
  mesaId: number;

  @ApiProperty({ type: [DetallePedidoResponseDto], required: false, description: 'Detalles del pedido' })
  @IsArray()
  @IsOptional()
  detalles?: DetallePedidoResponseDto[];

  @ApiProperty({ type: CuentaResponseDto, required: false, description: 'Cuenta asociada al pedido' })
  @IsOptional()
  cuenta?: CuentaResponseDto;
}
