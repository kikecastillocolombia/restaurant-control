import { ApiProperty } from '@nestjs/swagger';
import { Mesa } from '../entities/mesa.entity';

export class MesaResponseDto {
  @ApiProperty({ description: 'ID de la mesa' }) // Documentar la propiedad
  id: number;

  @ApiProperty({ description: 'Número de la mesa' }) // Documentar la propiedad
  numero: number;

  @ApiProperty({ description: 'Lista de IDs de pedidos asociados', type: [Number] }) // Documentar la propiedad
  pedidos: number[];

  constructor(mesa: Mesa) {
    this.id = mesa.id;
    this.numero = mesa.numero;
    this.pedidos = mesa.pedidos ? mesa.pedidos.map(pedido => pedido.id) : [];
  }
}
