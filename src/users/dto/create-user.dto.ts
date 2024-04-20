import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'John Doe',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Número de telefone do usuário',
    example: '1234567890',
  })
  @IsNumber()
  telefone: number;

  @ApiProperty({
    description: 'Senha do usuário com mínimo de 8 caracteres',
    example: 'strongPassword123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
