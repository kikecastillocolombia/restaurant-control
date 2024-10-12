import { Controller, Get, Post, Body, Param, Put, Delete, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { LoginDto } from 'src/dto/login.dto'; // Asegúrate de crear este DTO

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usuarioService.remove(id);
  }

  // Nuevo método para iniciar sesión
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Usuario> {
    const usuario = await this.usuarioService.validateUser(loginDto);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return usuario; // Devuelve el usuario o el rol según sea necesario
  }
}
