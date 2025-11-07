import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { ApiCacheInterceptor } from '../../common/interceptor/api-cache.interceptor';
import { SteamCommunityService } from './steam-community.service';
import { MiniProfileDto } from './dto/mini-profile.dto';
import { WorkshopCollectionDto } from './dto/workshop-collection.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('steam-community')
@UseInterceptors(ApiCacheInterceptor)
export class SteamCommunityController {
  constructor(private readonly steamCommunityService: SteamCommunityService) {}
  
  @Get('mini-profile')
  @ApiQuery({ name: 'steamID32', required: false, type: String })
  @ApiQuery({ name: 'language', required: false, type: String })
  async getMiniProfile(
    @Query('steamID32') steamID32: string,
    @Query('language') language: string,
  ): Promise<MiniProfileDto> {
    return this.steamCommunityService.getMiniProfile(steamID32, language);
  }

  @Get('workshop-collection')
  @ApiQuery({ name: 'workshopId', required: false, type: String })
  async getWorkshopCollection(
    @Query('workshopId') workshopId: string,
  ): Promise<WorkshopCollectionDto> {
    return this.steamCommunityService.getWorkshopCollection(workshopId);
  }
}
