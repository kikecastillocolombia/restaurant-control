import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mesa } from '../entities/mesa.entity';
import { CreateMesaDto } from 'src/dto/create-mesa.dto';

@Injectable()
export class MesaService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
  ) {}

  // Crear una nueva mesa
  async create(createMesaDto: CreateMesaDto): Promise<Mesa> {
    // Crea una nueva instancia de Mesa
    const mesa = this.mesaRepository.create(createMesaDto);
    return this.mesaRepository.save(mesa);
  }

  // Obtener todas las mesas
  async findAll(): Promise<Mesa[]> {
    return this.mesaRepository.find({ relations: ['pedidos'] });
}

  // Obtener una mesa por ID
  async findOne(id: number): Promise<Mesa> {
    return this.mesaRepository.findOne({ where: { id }, relations: ['pedidos'] });
}


  // Actualizar una mesa
  async update(id: number, mesa: Mesa): Promise<Mesa> {
    await this.mesaRepository.update(id, mesa);
    return this.findOne(id);
  }

  // Eliminar una mesa
  async remove(id: number): Promise<void> {
    await this.mesaRepository.delete(id);
  }
}
