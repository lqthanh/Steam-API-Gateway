import { Controller, Get } from '@nestjs/common';
import { L4d2ServerConfigService } from './l4d2-server-config.service';

@Controller('l4d2-server-config')
export class L4d2ServerConfigController {
  constructor(private readonly l4d2ServerConfigService: L4d2ServerConfigService) {}

  @Get('getMotd')
  async getMotd(): Promise<string> {
    return this.l4d2ServerConfigService.getMotd();
  }
}
