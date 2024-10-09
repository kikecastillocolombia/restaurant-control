import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { CreatePedidoDto } from 'src/dto/create-pedido.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { Mesa } from 'src/entities/mesa.entity';
import { UpdatePedidoDto } from 'src/dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, // Inyección del repositorio de Usuario
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
  ) {}

  // Crear un nuevo pedido
  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = new Pedido();
    pedido.fecha = createPedidoDto.fecha;
    pedido.estado = createPedidoDto.estado; // Asignar el estado desde el DTO
    pedido.usuario = await this.usuarioRepository.findOne({ where: { id: createPedidoDto.usuarioId } });
    pedido.mesa = await this.mesaRepository.findOne({ where: { id: createPedidoDto.mesaId } });

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
  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ where: { id } }); // Asegúrate de que esto sea un objeto
    if (!pedido) {
        throw new NotFoundException(`Pedido with ID ${id} not found`);
    }

    // Actualiza las propiedades del pedido
    Object.assign(pedido, updatePedidoDto);

    return this.pedidoRepository.save(pedido); // Guarda el pedido actualizado
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
