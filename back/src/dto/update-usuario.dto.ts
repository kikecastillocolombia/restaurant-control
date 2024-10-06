import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEnum(['mesero', 'administrador'])
  @IsOptional()
  rol?: string;
}
