import { PartialType } from '@nestjs/swagger';
import { CreateArmadilhaDto } from './create-armadilhas.dto';

export class UpdateArmadilhaDto extends PartialType(CreateArmadilhaDto) {}
