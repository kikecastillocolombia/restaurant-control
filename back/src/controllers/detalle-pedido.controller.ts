import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DetallePedidoService } from '../services/detalle-pedido.service';
import { DetallePedido } from '../entities/detalle-pedido.entity';

@Controller('detalles-pedido')
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  create(@Body() detallePedido: DetallePedido): Promise<DetallePedido> {
    return this.detallePedidoService.create(detallePedido);
  }

  @Get()
  findAll(): Promise<DetallePedido[]> {
    return this.detallePedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<DetallePedido> {
    return this.detallePedidoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() detallePedido: DetallePedido): Promise<DetallePedido> {
    return this.detallePedidoService.update(id, detallePedido);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.detallePedidoService.remove(id);
  }
}
