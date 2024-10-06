import { IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { DetallePedidoResponseDto } from './detalle-pedido-response.dto'; // Asegúrate de tener este DTO
import { CuentaResponseDto } from './cuenta-response.dto'; // Asegúrate de tener este DTO

export class PedidoResponseDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  fecha: Date;

  @IsNotEmpty()
  estado: string; // 'pendiente', 'listo', 'facturado'

  @IsInt()
  usuarioId: number; // ID del mesero que registró el pedido

  @IsInt()
  mesaId: number; // ID de la mesa donde se realizó el pedido

  @IsArray()
  @IsOptional() // Puede no estar presente
  detalles?: DetallePedidoResponseDto[];

  @IsOptional() // Puede no estar presente
  cuenta?: CuentaResponseDto;
}
