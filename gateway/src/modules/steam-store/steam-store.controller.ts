import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { ApiCacheInterceptor } from '../../common/interceptor/api-cache.interceptor';
import { SteamStoreService } from './steam-store.service';

@Controller('steam-store')
@UseInterceptors(ApiCacheInterceptor)
export class SteamStoreController {
  constructor(private readonly steamStoreService: SteamStoreService) {}
  
}
