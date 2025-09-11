import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalHttpModule } from './modules/global-http/global-http.module';
import { L4d2ServerConfigModule } from './modules/l4d2-server-config/l4d2-server-config.module';
import { SteamCommunityModule } from './modules/steam-community/steam-community.module';
import { SteamStoreModule } from './modules/steam-store/steam-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalHttpModule,
    L4d2ServerConfigModule,
    SteamCommunityModule,
    SteamStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
