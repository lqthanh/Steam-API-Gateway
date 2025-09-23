import { Module } from '@nestjs/common';
import { L4d2ServerConfigController } from './l4d2-server-config.controller';
import { L4d2ServerConfigService } from './l4d2-server-config.service';
import { SteamCommunityService } from '../steam-community/steam-community.service';

@Module({
  controllers: [L4d2ServerConfigController],
  providers: [L4d2ServerConfigService, SteamCommunityService],
})
export class L4d2ServerConfigModule {}
