import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
    required: false,
  })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email do usuário',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Telefone do usuário',
    required: false,
  })
  @IsNumber()
  telefone?: number;

  @ApiProperty({
    example: 'N3wP4ssw0rd',
    description: 'Senha do usuário',
    required: false,
  })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;
}
