import { PartialType } from '@nestjs/mapped-types';
import { CreateBonussDto } from './create-bonuss.dto';

export class UpdateBonussDto extends PartialType(CreateBonussDto) {}
