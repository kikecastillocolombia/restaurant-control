import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importa ApiProperty

export class LoginDto {
  @ApiProperty({ description: 'Nombre de usuario para el inicio de sesión', example: 'usuario123' }) // Descripción del campo
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'password123' }) // Descripción del campo
  @IsString()
  password: string;
}
