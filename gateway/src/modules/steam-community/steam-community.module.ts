import { Module } from '@nestjs/common';
import { SteamCommunityController } from './steam-community.controller';
import { SteamCommunityService } from './steam-community.service';

@Module({
  controllers: [SteamCommunityController],
  providers: [SteamCommunityService],
})
export class SteamCommunityModule {}
