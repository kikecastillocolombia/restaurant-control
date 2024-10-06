import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/dto/update-usuario.dto';

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
}
