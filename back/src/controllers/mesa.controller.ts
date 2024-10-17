import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MesaService } from '../services/mesa.service';
import { Mesa } from '../entities/mesa.entity';
import { CreateMesaDto } from 'src/dto/create-mesa.dto';
import { MesaResponseDto } from 'src/dto/mesa-response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('mesas') // Agrega esta línea para agrupar los endpoints
@Controller('mesas')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva mesa' })
  @ApiResponse({ status: 201, description: 'Mesa creada exitosamente', type: MesaResponseDto })
  async create(@Body() createMesaDto: CreateMesaDto): Promise<MesaResponseDto> {
    const mesa = await this.mesaService.create(createMesaDto);
    return new MesaResponseDto(mesa);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las mesas' })
  @ApiResponse({ status: 200, description: 'Lista de mesas', type: [MesaResponseDto] })
  findAll(): Promise<Mesa[]> {
    return this.mesaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una mesa por ID' })
  @ApiResponse({ status: 200, description: 'Mesa encontrada', type: MesaResponseDto })
  @ApiResponse({ status: 404, description: 'Mesa no encontrada' })
  findOne(@Param('id') id: number): Promise<Mesa> {
    return this.mesaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una mesa' })
  @ApiResponse({ status: 200, description: 'Mesa actualizada', type: MesaResponseDto })
  @ApiResponse({ status: 404, description: 'Mesa no encontrada' })
  update(@Param('id') id: number, @Body() mesa: Mesa): Promise<Mesa> {
    return this.mesaService.update(id, mesa);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una mesa' })
  @ApiResponse({ status: 204, description: 'Mesa eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Mesa no encontrada' })
  remove(@Param('id') id: number): Promise<void> {
    return this.mesaService.remove(id);
  }
}
