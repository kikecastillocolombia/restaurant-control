import { IsString, IsDecimal, IsOptional } from 'class-validator';

export class UpdatePlatoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsDecimal()
  @IsOptional()
  precio?: number;

  @IsString()
  @IsOptional()
  descripcion?: string; // Descripción del plato
}
