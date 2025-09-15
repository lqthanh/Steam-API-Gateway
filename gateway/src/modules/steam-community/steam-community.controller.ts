import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { ApiCacheInterceptor } from 'src/common/interceptor/api-cache.interceptor';
import { SteamCommunityService } from './steam-community.service';
import { MiniProfileDto } from './dto/mini-profile.dto';
import { WorkshopCollectionDto } from './dto/workshop-collection.dto';

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

  @Get('workshop-client-side-collection')
  async getWorkshopClientSideCollection(
  ): Promise<WorkshopCollectionDto> {
    return this.steamCommunityService.getWorkshopCollection('3547570164');
  }

  @Get('workshop-server-side-collection')
  async getWorkshopCollection(
  ): Promise<WorkshopCollectionDto> {
    return this.steamCommunityService.getWorkshopCollection('3547613940');
  }
}
