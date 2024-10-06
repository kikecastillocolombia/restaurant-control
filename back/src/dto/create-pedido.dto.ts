import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsDateString() // Valida que sea una fecha
  fecha: Date;

  @IsString()
  @IsNotEmpty() // Asegura que no esté vacío
  estado: string; // 'pendiente', 'listo', 'facturado'

  @IsInt()
  @IsNotEmpty()
  usuarioId: number; // ID del mesero que registró el pedido

  @IsInt()
  @IsNotEmpty()
  mesaId: number; // ID de la mesa donde se realizó el pedido
}
