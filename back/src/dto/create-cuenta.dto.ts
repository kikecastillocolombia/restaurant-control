import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateCuentaDto {
  @IsDecimal({ decimal_digits: '0,2' }) // Asegúrate de que este campo sea decimal
  total: number; // Total de la cuenta

  @IsNotEmpty() // Verifica que no esté vacío
  pagado: boolean; // Estado de la cuenta

  @IsNotEmpty() // Verifica que el ID del pedido esté presente
  pedidoId: number; // ID del pedido asociado
}
