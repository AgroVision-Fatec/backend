// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNumberString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'John Doe',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Por favor, forneça um endereço de e-mail válido.' })
  email: string;

  @ApiProperty({
    description: 'Número de telefone do usuário',
    example: '1234567890',
    type: 'string', // Especificar como string para compatibilidade com formatos internacionais e inclusão de caracteres não numéricos como hífens.
  })
  @IsNumberString({}, { message: 'O telefone deve ser uma string numérica.' })
  telefone: string;

  @ApiProperty({
    description: 'Senha do usuário com mínimo de 8 caracteres',
    example: 'strongPassword123',
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  password: string;
}
