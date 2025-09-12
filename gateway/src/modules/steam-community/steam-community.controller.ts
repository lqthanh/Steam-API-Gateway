import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { ApiCacheInterceptor } from 'src/common/interceptor/api-cache.interceptor';
import { SteamCommunityService } from './steam-community.service';
import { MiniProfileDto } from './dto/mini-profile.dto';

@Controller('steam-community')
@UseInterceptors(ApiCacheInterceptor)
export class SteamCommunityController {
  constructor(private readonly steamCommunityService: SteamCommunityService) {}
  
  @Get('mini-profile')
  async getMiniProfile(
    @Query('steamID32') steamID32: string,
    @Query('language') language: string,
  ): Promise<MiniProfileDto> {
    return this.steamCommunityService.getMiniProfile(steamID32, language);
  }
}
