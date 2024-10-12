import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Crear un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verificar si el nombre de usuario ya existe
    const existingUser = await this.usuarioRepository.findOne({
      where: { nombre: createUsuarioDto.nombre },
    });

    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya está en uso.');
    }

    // Crear una nueva instancia de Usuario
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    
    // Guardar en la base de datos
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

    // Combinar datos del DTO con la entidad existente
    Object.assign(usuario, updateUsuarioDto);

    return this.usuarioRepository.save(usuario);
  }

  // Eliminar un usuario
  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async validateUser(loginDto: LoginDto): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        nombre: loginDto.nombre,
        password: loginDto.password, // Ten en cuenta que guardar contraseñas en texto plano no es seguro.
      },
    });
    return usuario || null; // Devuelve el usuario si existe, o null si no
  }

}
