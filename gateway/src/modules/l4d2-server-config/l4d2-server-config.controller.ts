import { Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { ApiCacheInterceptor } from 'src/common/interceptor/api-cache.interceptor';
import { L4d2ServerConfigService } from './l4d2-server-config.service';
import { AdminSimpleDto } from './dto/admin-simple.dto';

@Controller('l4d2-server-config')
@UseInterceptors(ApiCacheInterceptor)
export class L4d2ServerConfigController {
  constructor(
    private readonly l4d2ServerConfigService: L4d2ServerConfigService,
  ) {}

  @Get('getAdminSimple')
  async getAdminSimple(): Promise<AdminSimpleDto[]> {
    return this.l4d2ServerConfigService.getAdminSimple();
  }

  @Get('getMotd')
  async getMotd(): Promise<string> {
    return this.l4d2ServerConfigService.getMotd();
  }
}
