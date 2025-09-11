import { Controller, Get } from '@nestjs/common';
import { SteamCommunityService } from './steam-community.service';

@Controller('steam-community')
export class SteamCommunityController {
  constructor(private readonly steamCommunityService: SteamCommunityService) {}
  
}
