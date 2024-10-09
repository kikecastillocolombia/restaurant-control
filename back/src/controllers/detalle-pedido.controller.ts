import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DetallePedidoService } from '../services/detalle-pedido.service';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { CreateDetallePedidoDto } from 'src/dto/create-detalle-pedido.dto';

@Controller('detalles-pedido')
export class DetallePedidoController {
    constructor(private readonly detallePedidoService: DetallePedidoService) {}

    @Post()
    async create(@Body() detallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
        return this.detallePedidoService.create(detallePedidoDto);
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
    async update(@Param('id') id: number, @Body() detallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
        return this.detallePedidoService.update(id, detallePedidoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.detallePedidoService.remove(id);
    }
}
