// src/controllers/plato.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PlatoService } from '../services/plato.service';
import { Plato } from '../entities/plato.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePlatoDto } from 'src/dto/create-plato.dto';
import { UpdatePlatoDto } from 'src/dto/update-plato.dto';

@ApiTags('platos') // Agrupa los endpoints bajo 'platos'
@Controller('platos')
export class PlatoController {
  constructor(private readonly platoService: PlatoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo plato' })
  @ApiResponse({ status: 201, description: 'Plato creado exitosamente', type: Plato })
  async create(@Body() createPlatoDto: CreatePlatoDto): Promise<Plato> {
    return this.platoService.create(createPlatoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los platos' })
  @ApiResponse({ status: 200, description: 'Lista de platos', type: [Plato] })
  async findAll(): Promise<Plato[]> {
    return this.platoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un plato por ID' })
  @ApiResponse({ status: 200, description: 'Plato encontrado', type: Plato })
  @ApiResponse({ status: 404, description: 'Plato no encontrado' })
  async findOne(@Param('id') id: number): Promise<Plato> {
    return this.platoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un plato' })
  @ApiResponse({ status: 200, description: 'Plato actualizado', type: Plato })
  @ApiResponse({ status: 404, description: 'Plato no encontrado' })
  async update(@Param('id') id: number, @Body() updatePlatoDto: UpdatePlatoDto): Promise<Plato> {
    return this.platoService.update(id, updatePlatoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un plato' })
  @ApiResponse({ status: 204, description: 'Plato eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Plato no encontrado' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.platoService.remove(id);
  }
}
