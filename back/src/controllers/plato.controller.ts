import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PlatoService } from '../services/plato.service';
import { Plato } from '../entities/plato.entity';

@Controller('platos')
export class PlatoController {
  constructor(private readonly platoService: PlatoService) {}

  @Post()
  create(@Body() plato: Plato): Promise<Plato> {
    return this.platoService.create(plato);
  }

  @Get()
  findAll(): Promise<Plato[]> {
    return this.platoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Plato> {
    return this.platoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() plato: Plato): Promise<Plato> {
    return this.platoService.update(id, plato);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.platoService.remove(id);
  }
}
