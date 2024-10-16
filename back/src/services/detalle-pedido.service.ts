import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { CreateDetallePedidoDto } from 'src/dto/create-detalle-pedido.dto';
import { Pedido } from '../entities/pedido.entity';
import { Producto } from '../entities/producto.entity'; // Cambié Plato por Producto

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Producto) // Cambié Plato por Producto
    private readonly productoRepository: Repository<Producto>,
  ) {}

  // Crear un nuevo detalle de pedido
  async create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    const detallePedido = new DetallePedido();
    detallePedido.cantidad = createDetallePedidoDto.cantidad;

    // Obtener el pedido y producto desde la base de datos
    detallePedido.pedido = await this.pedidoRepository.findOne({ where: { id: createDetallePedidoDto.pedidoId } });
    detallePedido.producto = await this.productoRepository.findOne({ where: { id: createDetallePedidoDto.productoId } }); // Cambié plato por producto

    return this.detallePedidoRepository.save(detallePedido);
  }

  // Obtener todos los detalles de pedido
  async findAll(): Promise<DetallePedido[]> {
    return this.detallePedidoRepository.find({ relations: ['producto', 'pedido'] }); // Cambié plato por producto
  }

  // Obtener un detalle de pedido por ID
  async findOne(id: number): Promise<DetallePedido> {
    return this.detallePedidoRepository.findOne({ where: { id }, relations: ['producto', 'pedido'] }); // Cambié plato por producto
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
    detallePedido.producto = await this.productoRepository.findOne({ where: { id: createDetallePedidoDto.productoId } }); // Cambié plato por producto

    return this.detallePedidoRepository.save(detallePedido);
  }

  // Eliminar un detalle de pedido
  async remove(id: number): Promise<void> {
    await this.detallePedidoRepository.delete(id);
  }
}
