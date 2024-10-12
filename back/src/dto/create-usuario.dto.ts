import { IsString, IsNotEmpty, IsEnum, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importar ApiProperty para documentar propiedades

// Definir enum para roles de usuario
export enum Rol {
  MESERO = 'mesero',
  ADMINISTRADOR = 'administrador',
}

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nombre del usuario' }) // Descripción de la propiedad
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Contraseña del usuario', minLength: 6 }) // Descripción y longitud mínima
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Rol del usuario', enum: Rol }) // Descripción y enum
  @IsEnum(Rol)
  @IsNotEmpty()
  rol: Rol;
}
