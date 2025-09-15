import { IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CollectionItemDto {
  @IsUrl()
  url: string;

  @IsUrl()
  steamUrl: string;

  @IsUrl()
  imgUrl: string;

  @IsString()
  title: string;

  @IsString()
  authorName: string;

  @IsUrl()
  authorUrl: string;
 
  @IsUrl()
  rateImgUrl: string;
}

export class WorkshopCollectionDto {
  @IsString()
  title: string;

  descriptionItems: any[];

  @ValidateNested({ each: true })
  @Type(() => CollectionItemDto)
  items: CollectionItemDto[];
}