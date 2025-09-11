import { Controller, Get } from '@nestjs/common';
import { SteamStoreService } from './steam-store.service';

@Controller('steam-store')
export class SteamStoreController {
  constructor(private readonly steamStoreService: SteamStoreService) {}
  
}
