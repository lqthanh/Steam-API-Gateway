import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { ApiCacheInterceptor } from '../../common/interceptor/api-cache.interceptor';
import { L4d2ServerConfigService } from './l4d2-server-config.service';
import { SteamCommunityService } from '../steam-community/steam-community.service';
import { AdminSimpleDto } from './dto/admin-simple.dto';
import { WorkshopCollectionDto } from '../steam-community/dto/workshop-collection.dto';

@Controller('l4d2-server-config')
@UseInterceptors(ApiCacheInterceptor)
export class L4d2ServerConfigController {
  constructor(
    private readonly l4d2ServerConfigService: L4d2ServerConfigService,
    private readonly steamCommunityService: SteamCommunityService,
  ) {}

  @Get('admin-simple')
  async getAdminSimple(): Promise<AdminSimpleDto[]> {
    return this.l4d2ServerConfigService.getAdminSimple();
  }

  @Get('motd')
  async getMotd(): Promise<string> {
    return this.l4d2ServerConfigService.getMotd();
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
