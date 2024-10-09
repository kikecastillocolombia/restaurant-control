import { IsString, IsNotEmpty, IsDecimal, IsNumber } from 'class-validator';

export class CreatePlatoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber() // Aquí puedes especificar los dígitos decimales
  precio: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string; // Descripción del plato
}
