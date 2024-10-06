import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEnum(['mesero', 'administrador'])
  @IsNotEmpty()
  rol: string;
}
