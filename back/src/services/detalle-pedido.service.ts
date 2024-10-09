import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { CreateDetallePedidoDto } from 'src/dto/create-detalle-pedido.dto';
import { Pedido } from '../entities/pedido.entity';
import { Plato } from '../entities/plato.entity';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  // Crear un nuevo detalle de pedido
  async create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    const detallePedido = new DetallePedido();
    detallePedido.cantidad = createDetallePedidoDto.cantidad;

    // Obtener el pedido y plato desde la base de datos
    detallePedido.pedido = await this.pedidoRepository.findOne({ where: { id: createDetallePedidoDto.pedidoId } });
    detallePedido.plato = await this.platoRepository.findOne({ where: { id: createDetallePedidoDto.platoId } });

    return this.detallePedidoRepository.save(detallePedido);
}


  // Obtener todos los detalles de pedido
  async findAll(): Promise<DetallePedido[]> {
    return this.detallePedidoRepository.find({ relations: ['plato', 'pedido'] });
  }

  // Obtener un detalle de pedido por ID
  async findOne(id: number): Promise<DetallePedido> {
    return this.detallePedidoRepository.findOne({ where: { id }, relations: ['plato', 'pedido'] });
  }

  // Actualizar un detalle de pedido
  async update(id: number, createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    const detallePedido = await this.detallePedidoRepository.findOne({ where: { id } });

    if (!detallePedido) {
        throw new Error('Detalle de pedido no encontrado');
    }

    // Actualizamos los campos
    detallePedido.cantidad = createDetallePedidoDto.cantidad;
    detallePedido.pedido = await this.pedidoRepository.findOne({ where: { id: createDetallePedidoDto.pedidoId } });
    detallePedido.plato = await this.platoRepository.findOne({ where: { id: createDetallePedidoDto.platoId } });

    return this.detallePedidoRepository.save(detallePedido);
}


  // Eliminar un detalle de pedido
  async remove(id: number): Promise<void> {
    await this.detallePedidoRepository.delete(id);
  }
}
