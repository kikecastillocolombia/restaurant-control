import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CuentaService } from '../services/cuenta.service';
import { Cuenta } from '../entities/cuenta.entity';
import { CreateCuentaDto } from 'src/dto/create-cuenta.dto';
import { CuentaResponseDto } from 'src/dto/cuenta-response.dto';

@Controller('cuentas')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) {
    console.log('CuentaController instanciado');
  }

  @Post()
async create(@Body() createCuentaDto: CreateCuentaDto): Promise<Cuenta> {
  console.log(typeof createCuentaDto.total); // Debería imprimir "number"
  return this.cuentaService.create(createCuentaDto);
}



  @Get()
  findAll(): Promise<Cuenta[]> {
    return this.cuentaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Cuenta> {
    return this.cuentaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() cuenta: Cuenta): Promise<Cuenta> {
    return this.cuentaService.update(id, cuenta);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.cuentaService.remove(id);
  }
}
