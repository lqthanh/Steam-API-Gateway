import { Module } from '@nestjs/common';
import { SteamStoreController } from './steam-store.controller';
import { SteamStoreService } from './steam-store.service';

@Module({
  controllers: [SteamStoreController],
  providers: [SteamStoreService],
})
export class SteamStoreModule {}
