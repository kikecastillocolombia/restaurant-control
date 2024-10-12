import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importa ApiProperty

export class CreateCuentaDto {
  @ApiProperty({ description: 'Total de la cuenta', example: 100.50 })
  @IsNumber() // Asegúrate de que este campo sea decimal
  total: number;

  @ApiProperty({ description: 'Estado de la cuenta', example: false })
  @IsNotEmpty() // Verifica que no esté vacío
  pagado: boolean;

  @ApiProperty({ description: 'ID del pedido asociado', example: 1 })
  @IsNotEmpty() // Verifica que el ID del pedido esté presente
  pedidoId: number;
}
