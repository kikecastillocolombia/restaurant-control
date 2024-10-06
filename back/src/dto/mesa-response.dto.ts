import { Mesa } from '../entities/mesa.entity';

export class MesaResponseDto {
  id: number;
  numero: number;
  pedidos: number[]; // Aquí podrías incluir más información sobre los pedidos, como objetos de respuesta.

  constructor(mesa: Mesa) {
    this.id = mesa.id;
    this.numero = mesa.numero;
    this.pedidos = mesa.pedidos.map(pedido => pedido.id); // Solo devuelve los IDs de los pedidos, o puedes mapearlo a un DTO de pedido
  }
}
