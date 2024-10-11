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

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsEnum(Rol)
  @IsNotEmpty()
  rol: Rol;
}
