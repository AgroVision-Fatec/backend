import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'O endereço de email do usuário',
    required: true,
  })
  @IsEmail({}, { message: 'Email inválido' })
  readonly email: string;

  @ApiProperty({
    example: 'senhaSegura123',
    description: 'A senha do usuário, que deve ter no mínimo 8 caracteres',
    required: true,
    minLength: 8,
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  readonly password: string;
}
