import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto, Rol } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) { // Extiende de CreateUsuarioDto
  @ApiProperty({ description: 'Nombre del usuario', required: false }) // Descripción y opcionalidad
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ description: 'Rol del usuario', enum: ['mesero', 'administrador'], required: false }) // Descripción y opcionalidad
  @IsEnum(['mesero', 'administrador'])
  @IsOptional()
  rol?: Rol;
}
