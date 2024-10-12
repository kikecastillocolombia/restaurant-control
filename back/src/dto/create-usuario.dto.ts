import { IsString, IsNotEmpty, IsEnum, IsEmail, MinLength } from 'class-validator';

// Definir enum para roles de usuario
export enum Rol {
  MESERO = 'mesero',
  ADMINISTRADOR = 'administrador',
}

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty()
  password: string;

  @IsEnum(Rol)
  @IsNotEmpty()
  rol: Rol;
}
