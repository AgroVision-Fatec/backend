import { PartialType } from '@nestjs/mapped-types';
import { CreateDadosArmadilhaDto } from './create-dados-armadilhas.dto';

export class UpdateDadosArmadilhaDto extends PartialType(
  CreateDadosArmadilhaDto,
) {}
