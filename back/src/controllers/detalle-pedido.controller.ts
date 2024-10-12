import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DetallePedidoService } from '../services/detalle-pedido.service';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { CreateDetallePedidoDto } from 'src/dto/create-detalle-pedido.dto';
import { DetallePedidoResponseDto } from 'src/dto/detalle-pedido-response.dto'; // Importa el DTO de respuesta
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las decoraciones de Swagger

@ApiTags('Detalles Pedido') // Categoriza las rutas bajo "Detalles Pedido"
@Controller('detalles-pedido')
export class DetallePedidoController {
    constructor(private readonly detallePedidoService: DetallePedidoService) {}

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo detalle de pedido' }) // Resumen de la operación
    @ApiResponse({ status: 201, description: 'Detalle de pedido creado', type: DetallePedidoResponseDto }) // Respuesta esperada
    async create(@Body() detallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
        return this.detallePedidoService.create(detallePedidoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los detalles de pedido' }) // Resumen de la operación
    @ApiResponse({ status: 200, description: 'Lista de detalles de pedido', type: [DetallePedidoResponseDto] }) // Respuesta esperada
    findAll(): Promise<DetallePedido[]> {
        return this.detallePedidoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un detalle de pedido por ID' }) // Resumen de la operación
    @ApiResponse({ status: 200, description: 'Detalle de pedido encontrado', type: DetallePedidoResponseDto }) // Respuesta esperada
    findOne(@Param('id') id: number): Promise<DetallePedido> {
        return this.detallePedidoService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un detalle de pedido existente' }) // Resumen de la operación
    @ApiResponse({ status: 200, description: 'Detalle de pedido actualizado', type: DetallePedidoResponseDto }) // Respuesta esperada
    async update(@Param('id') id: number, @Body() detallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
        return this.detallePedidoService.update(id, detallePedidoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un detalle de pedido por ID' }) // Resumen de la operación
    @ApiResponse({ status: 204, description: 'Detalle de pedido eliminado' }) // Respuesta esperada
    remove(@Param('id') id: number): Promise<void> {
        return this.detallePedidoService.remove(id);
    }
}
