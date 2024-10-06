import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Crear un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Crea una instancia de Usuario a partir del DTO
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    
    // Guarda la entidad en la base de datos
    return await this.usuarioRepository.save(usuario);
  }

  // Obtener todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  // Obtener un usuario por ID
  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  // Actualizar un usuario
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Combinar los datos del DTO con la entidad existente
    Object.assign(usuario, updateUsuarioDto);

    return this.usuarioRepository.save(usuario);
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
