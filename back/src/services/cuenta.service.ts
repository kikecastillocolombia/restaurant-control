import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuenta } from '../entities/cuenta.entity';
import { CreateCuentaDto } from 'src/dto/create-cuenta.dto';
import { CuentaResponseDto } from 'src/dto/cuenta-response.dto';
import { Pedido } from 'src/entities/pedido.entity';

@Injectable()
export class CuentaService {
  constructor(
    @InjectRepository(Cuenta)
    private readonly cuentaRepository: Repository<Cuenta>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createCuentaDto: CreateCuentaDto): Promise<Cuenta> {
    const cuenta = new Cuenta();
    cuenta.total = createCuentaDto.total;
    cuenta.pagado = createCuentaDto.pagado;
  
    const pedido = await this.pedidoRepository.findOne({ where: { id: createCuentaDto.pedidoId } });
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    
    cuenta.pedido = pedido; // Asigna el pedido a la cuenta
    return this.cuentaRepository.save(cuenta);
  }
  
  

  // Obtener todas las cuentas
  async findAll(): Promise<Cuenta[]> {
    return this.cuentaRepository.find({ relations: ['pedido'] });
  }

  // Obtener una cuenta por ID
  async findOne(id: number): Promise<Cuenta> {
    return this.cuentaRepository.findOne({ where: { id }, relations: ['pedido'] });
  }

  // Actualizar una cuenta
  async update(id: number, cuenta: Cuenta): Promise<Cuenta> {
    await this.cuentaRepository.update(id, cuenta);
    return this.findOne(id);
  }

  // Eliminar una cuenta
  async remove(id: number): Promise<void> {
    await this.cuentaRepository.delete(id);
  }

  private toResponseDto(cuenta: Cuenta): CuentaResponseDto {
    const responseDto = new CuentaResponseDto();
    responseDto.id = cuenta.id;
    responseDto.total = cuenta.total;
    responseDto.pagado = cuenta.pagado;
    responseDto.pedidoId = cuenta.pedido ? cuenta.pedido.id : null; // Asegúrate de tener la relación cargada
    return responseDto;
  }
}
