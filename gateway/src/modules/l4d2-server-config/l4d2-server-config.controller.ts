import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { L4d2ServerConfigService } from './l4d2-server-config.service';
import { ApiCacheInterceptor } from 'src/common/interceptor/api-cache.interceptor';

@Controller('l4d2-server-config')
@UseInterceptors(ApiCacheInterceptor)
export class L4d2ServerConfigController {
  constructor(
    private readonly l4d2ServerConfigService: L4d2ServerConfigService,
  ) {}

  @Get('getMotd')
  async getMotd(): Promise<string> {
    return this.l4d2ServerConfigService.getMotd();
  }
}
