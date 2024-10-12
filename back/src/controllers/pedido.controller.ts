import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../entities/pedido.entity';
import { CreatePedidoDto } from '../dto/create-pedido.dto'; // Asegúrate de importar esto
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePedidoDto } from '../dto/update-pedido.dto'; // Asegúrate de importar el DTO para la actualización

@ApiTags('pedidos') // Agrupa los endpoints bajo 'pedidos'
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente', type: Pedido })
  async create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos', type: [Pedido] })
  findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado', type: Pedido })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  findOne(@Param('id') id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un pedido' })
  @ApiResponse({ status: 200, description: 'Pedido actualizado', type: Pedido })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async update(@Param('id') id: number, @Body() updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    return this.pedidoService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pedido' })
  @ApiResponse({ status: 204, description: 'Pedido eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.pedidoService.remove(id);
  }
}
