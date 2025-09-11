import { Controller, Get, Inject } from '@nestjs/common';
import { L4d2ServerConfigService } from './l4d2-server-config.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Controller('l4d2-server-config')
export class L4d2ServerConfigController {
  constructor(
    private readonly l4d2ServerConfigService: L4d2ServerConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('getMotd')
  async getMotd(): Promise<string> {
    const cacheKey = '/l4d2-server-config/getMotd';

    // Kiểm tra cache
    const cachedData = await this.cacheManager.get<string>(cacheKey);
    if (cachedData) {
      console.log('Returning cached data for getMotd');
      return cachedData;
    }

    // Nếu chưa có cache thì gọi service
    const data = await this.l4d2ServerConfigService.getMotd();

    // Lưu vào cache với TTL = 5 phút
    await this.cacheManager.set(cacheKey, data);

    return data;
  }
}
