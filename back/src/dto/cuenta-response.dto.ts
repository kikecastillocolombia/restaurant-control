import { IsBoolean, IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class CuentaResponseDto {
  @IsInt()
  id: number;

  @IsDecimal()
  @IsNotEmpty() // Asegura que no esté vacío
  total: number; // Total de la cuenta

  @IsBoolean()
  pagado: boolean; // Si la cuenta está pagada o no

  @IsInt()
  @IsNotEmpty() // Asegura que no esté vacío
  pedidoId: number; // ID del pedido asociado
}
