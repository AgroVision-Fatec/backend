// src/users/dto/update-user.dto.ts
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nome completo do usuário',
    example: 'Jane Doe',
  })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiPropertyOptional({
    description: 'Endereço de e-mail do usuário atualizado',
    example: 'jane.doe@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Número de telefone atualizado do usuário',
    example: '+1234567890',
  })
  @IsString() // Ensure this matches the entity definition
  @IsOptional()
  telefone?: string;

  @ApiPropertyOptional({
    description: 'Nova senha do usuário com mínimo de 8 caracteres',
    example: 'newStrongPassword123',
  })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;
}
