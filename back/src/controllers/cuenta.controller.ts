import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CuentaService } from '../services/cuenta.service';
import { Cuenta } from '../entities/cuenta.entity';
import { CreateCuentaDto } from 'src/dto/create-cuenta.dto';
import { CuentaResponseDto } from 'src/dto/cuenta-response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa las decoraciones de Swagger

@ApiTags('Cuentas') // Categoriza las rutas bajo "Cuentas"
@Controller('cuentas')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) {
    console.log('CuentaController instanciado');
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cuenta' }) // Resumen de la operación
  @ApiResponse({ status: 201, description: 'Cuenta creada', type: CuentaResponseDto }) // Respuesta esperada
  async create(@Body() createCuentaDto: CreateCuentaDto): Promise<Cuenta> {
    console.log(typeof createCuentaDto.total); // Debería imprimir "number"
    return this.cuentaService.create(createCuentaDto);
  }

  @Post(':pedidoId/plato/:platoId')
  @ApiOperation({ summary: 'Agregar un plato a una cuenta existente' })
  @ApiResponse({ status: 200, description: 'Plato agregado a la cuenta' })
  async agregarPlato(@Param('pedidoId') pedidoId: number, @Param('platoId') platoId: number) {
    return this.cuentaService.agregarPlatoACuenta(pedidoId, platoId);
  }

  @Post(':id/cobrar')
  @ApiOperation({ summary: 'Cobrar una cuenta' })
  @ApiResponse({ status: 200, description: 'Cuenta cobrada' })
  async cobrar(@Param('id') cuentaId: number) {
    return this.cuentaService.cobrarCuenta(cuentaId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las cuentas' })
  @ApiResponse({ status: 200, description: 'Lista de cuentas', type: [CuentaResponseDto] })
  findAll(): Promise<Cuenta[]> {
    return this.cuentaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cuenta por ID' })
  @ApiResponse({ status: 200, description: 'Cuenta encontrada', type: CuentaResponseDto })
  findOne(@Param('id') id: number): Promise<Cuenta> {
    return this.cuentaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una cuenta existente' })
  @ApiResponse({ status: 200, description: 'Cuenta actualizada', type: CuentaResponseDto })
  update(@Param('id') id: number, @Body() cuenta: Cuenta): Promise<Cuenta> {
    return this.cuentaService.update(id, cuenta);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cuenta por ID' })
  @ApiResponse({ status: 204, description: 'Cuenta eliminada' })
  remove(@Param('id') id: number): Promise<void> {
    return this.cuentaService.remove(id);
  }
}
