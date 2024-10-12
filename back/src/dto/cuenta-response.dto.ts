import { IsBoolean, IsDecimal, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importa ApiProperty

export class CuentaResponseDto {
  @ApiProperty({ description: 'ID de la cuenta', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Total de la cuenta', example: 100.50 })
  @IsDecimal()
  @IsNotEmpty() // Asegura que no esté vacío
  total: number;

  @ApiProperty({ description: 'Si la cuenta está pagada o no', example: false })
  @IsBoolean()
  pagado: boolean;

  @ApiProperty({ description: 'ID del pedido asociado', example: 1 })
  @IsInt()
  @IsNotEmpty() // Asegura que no esté vacío
  pedidoId: number;
}
