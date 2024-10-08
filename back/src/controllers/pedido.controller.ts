import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../entities/pedido.entity';
import { CreatePedidoDto } from '../dto/create-pedido.dto'; // Asegúrate de importar esto

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() pedido: Pedido): Promise<Pedido> {
    return this.pedidoService.update(id, pedido);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.pedidoService.remove(id);
  }
}
