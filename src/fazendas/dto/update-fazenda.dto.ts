import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateFazendaDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nome?: string;

  @IsOptional()
  @IsString()
  tipoCoordenada?: string;

  @IsOptional()
  @IsString()
  coordenadas?: string;
}
