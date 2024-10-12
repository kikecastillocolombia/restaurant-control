import { Controller, Get, Post, Body, Param, Put, Delete, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importar los decoradores de Swagger
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';
import { LoginDto } from 'src/dto/login.dto'; // Asegúrate de crear este DTO

@ApiTags('usuarios') // Etiqueta para organizar los endpoints
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' }) // Resumen del endpoint
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito.', type: Usuario }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' }) // Respuesta de error
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [Usuario] })
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: Usuario })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: Usuario })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('id') id: number): Promise<void> {
    return this.usuarioService.remove(id);
  }

  // Nuevo método para iniciar sesión
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso', type: Usuario })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async login(@Body() loginDto: LoginDto): Promise<Usuario> {
    const usuario = await this.usuarioService.validateUser(loginDto);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return usuario; // Devuelve el usuario o el rol según sea necesario
  }
}
