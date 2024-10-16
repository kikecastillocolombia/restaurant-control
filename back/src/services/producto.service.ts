import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { CreateProductoDto } from 'src/dto/create-producto.dto';
import { UpdateProductoDto } from 'src/dto/update-producto.dto';
import { DetallePedido } from 'src/entities/detalle-pedido.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
  ) {}

  // Crear un nuevo producto
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    try {
      const producto = this.productoRepository.create(createProductoDto);
      return await this.productoRepository.save(producto);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  // Obtener todos los productos
  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  // Obtener un producto por ID
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  // Actualizar un producto
async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
  const producto = await this.findOne(id);
  
  // Manejo de errores si el producto no existe
  if (!producto) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }

  // Actualizar propiedades del producto solo si están definidas
  Object.assign(producto, updateProductoDto);

  await this.productoRepository.save(producto);
  return producto;
}


  // Eliminar un producto
  async remove(id: number): Promise<void> {
    // Verificar si hay detalles de pedido asociados al producto
    const detalles = await this.detallePedidoRepository.find({ where: { producto: {id} } });
    
    if (detalles.length > 0) {
      throw new BadRequestException(`No se puede eliminar el producto con ID ${id} porque tiene detalles de pedido asociados.`);
    }

    // Intentar eliminar el producto
    const result = await this.productoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
  }
}
