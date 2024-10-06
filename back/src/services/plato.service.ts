import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from '../entities/plato.entity';

@Injectable()
export class PlatoService {
  constructor(
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  // Crear un nuevo plato
  async create(plato: Plato): Promise<Plato> {
    return this.platoRepository.save(plato);
  }

  // Obtener todos los platos
  async findAll(): Promise<Plato[]> {
    return this.platoRepository.find();
  }

  // Obtener un plato por ID
  async findOne(id: number): Promise<Plato> {
    return this.platoRepository.findOne({ where: { id } });
  }

  // Actualizar un plato
  async update(id: number, plato: Plato): Promise<Plato> {
    await this.platoRepository.update(id, plato);
    return this.findOne(id);
  }

  // Eliminar un plato
  async remove(id: number): Promise<void> {
    await this.platoRepository.delete(id);
  }
}
