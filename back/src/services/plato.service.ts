// src/services/plato.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from '../entities/plato.entity';
import { CreatePlatoDto } from 'src/dto/create-plato.dto';
import { UpdatePlatoDto } from 'src/dto/update-plato.dto';

@Injectable()
export class PlatoService {
  constructor(
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  // Crear un nuevo plato
async create(createPlatoDto: CreatePlatoDto): Promise<Plato> {
  try {
    const plato = this.platoRepository.create(createPlatoDto); // Crea la entidad usando el DTO
    return await this.platoRepository.save(plato); // Guarda la entidad en la base de datos
  } catch (error) {
    // Lanza una excepción si ocurre algún error
    throw new InternalServerErrorException('Error al crear el plato');
  }
}
  // Obtener todos los platos
  async findAll(): Promise<Plato[]> {
    return this.platoRepository.find();
  }

  // Obtener un plato por ID
  async findOne(id: number): Promise<Plato> {
    const plato = await this.platoRepository.findOne({ where: { id } });
    if (!plato) {
      throw new NotFoundException(`Plato con ID ${id} no encontrado`);
    }
    return plato;
  }

  // Actualizar un plato
  async update(id: number, updatePlatoDto: UpdatePlatoDto): Promise<Plato> {
    const plato = await this.findOne(id); // Asegura que el plato existe

    // Actualiza solo los campos que están presentes en el DTO
    if (updatePlatoDto.nombre !== undefined) {
      plato.nombre = updatePlatoDto.nombre;
    }
    if (updatePlatoDto.precio !== undefined) {
      plato.precio = updatePlatoDto.precio;
    }
    if (updatePlatoDto.descripcion !== undefined) {
      plato.descripcion = updatePlatoDto.descripcion;
    }

    await this.platoRepository.save(plato); // Guarda los cambios
    return plato;
  }

  // Eliminar un plato
  async remove(id: number): Promise<void> {
    const result = await this.platoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Plato con ID ${id} no encontrado`);
    }
  }
}
