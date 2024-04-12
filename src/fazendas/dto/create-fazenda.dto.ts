import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateFazendaDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nome: string;

  @IsOptional()
  @IsString()
  tipoCoordenada: string;

  @IsOptional()
  @IsString()
  coordenadas: string;
}
