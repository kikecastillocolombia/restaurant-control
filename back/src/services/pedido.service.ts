import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { DetallePedido } from '../entities/detalle-pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
  ) {}

  // Crear un nuevo pedido
  async create(pedido: Pedido): Promise<Pedido> {
    // Aquí podrías agregar validaciones
    if (!pedido) {
      throw new BadRequestException('Los datos del pedido son inválidos.');
    }
    return this.pedidoRepository.save(pedido);
  }

  // Obtener todos los pedidos
  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({ relations: ['detalles', 'usuario', 'mesa'] });
  }

  // Obtener un pedido por ID
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ where: { id }, relations: ['detalles', 'usuario', 'mesa'] });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }
    return pedido;
  }

  // Actualizar un pedido
  async update(id: number, pedido: Pedido): Promise<Pedido> {
    const existingPedido = await this.findOne(id); // Llama a findOne para asegurarte de que existe
    if (!existingPedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }
    await this.pedidoRepository.update(id, pedido);
    return this.findOne(id);
  }

  // Eliminar un pedido
  async remove(id: number): Promise<void> {
    const existingPedido = await this.findOne(id); // Verifica si existe
    if (!existingPedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }
    await this.pedidoRepository.delete(id);
  }
}
