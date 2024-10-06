import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MesaService } from '../services/mesa.service';
import { Mesa } from '../entities/mesa.entity';
import { CreateMesaDto } from 'src/dto/create-mesa.dto';
import { MesaResponseDto } from 'src/dto/mesa-response.dto';

@Controller('mesas')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Post()
  async create(@Body() createMesaDto: CreateMesaDto): Promise<MesaResponseDto> {
    const mesa = await this.mesaService.create(createMesaDto);
    return new MesaResponseDto(mesa);
  }

  @Get()
  findAll(): Promise<Mesa[]> {
    return this.mesaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Mesa> {
    return this.mesaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() mesa: Mesa): Promise<Mesa> {
    return this.mesaService.update(id, mesa);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.mesaService.remove(id);
  }
}
