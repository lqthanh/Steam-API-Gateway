import { IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FavoriteBadgeDto {
  @IsString()
  name: string;

  @IsString()
  xp: string;

  @IsNumber()
  level: number;

  @IsString()
  description: string;

  @IsUrl()
  icon: string;
}

class ProfileBackgroundDto {
  @IsUrl()
  @IsString()
  'video/webm': string;

  @IsUrl()
  @IsString()
  'video/mp4': string;
}

export class MiniProfileDto {
  @IsNumber()
  level: number;

  @IsString()
  level_class: string;

  @IsUrl()
  avatar_url: string;

  @IsString()
  persona_name: string;

  @ValidateNested()
  @Type(() => FavoriteBadgeDto)
  favorite_badge: FavoriteBadgeDto;

  @ValidateNested()
  @Type(() => ProfileBackgroundDto)
  profile_background: ProfileBackgroundDto;

  @IsUrl()
  avatar_frame: string;

  @IsUrl()
  profile_url: string;

  @IsUrl()
  profile_steam_url: string;
}