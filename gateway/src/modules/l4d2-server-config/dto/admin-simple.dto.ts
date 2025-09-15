import { IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminSimpleDto {
  @IsString()
  steamID: string;

  @IsNumber()
  steamID32: number;
}