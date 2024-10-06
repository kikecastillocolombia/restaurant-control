import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from '../entities/detalle-pedido.entity';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
  ) {}

  // Crear un nuevo detalle de pedido
  async create(detallePedido: DetallePedido): Promise<DetallePedido> {
    return this.detallePedidoRepository.save(detallePedido);
  }

  // Obtener todos los detalles de pedido
  async findAll(): Promise<DetallePedido[]> {
    return this.detallePedidoRepository.find({ relations: ['plato'] });
  }

  // Obtener un detalle de pedido por ID
  async findOne(id: number): Promise<DetallePedido> {
    return this.detallePedidoRepository.findOne({ where: { id }, relations: ['plato'] });
  }

  // Actualizar un detalle de pedido
  async update(id: number, detallePedido: DetallePedido): Promise<DetallePedido> {
    await this.detallePedidoRepository.update(id, detallePedido);
    return this.findOne(id);
  }

  // Eliminar un detalle de pedido
  async remove(id: number): Promise<void> {
    await this.detallePedidoRepository.delete(id);
  }
}
