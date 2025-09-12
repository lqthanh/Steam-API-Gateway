import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ErrorMessage } from 'src/common/enums/error-message.enum';
import { MiniProfileDto } from './dto/mini-profile.dto';

@Injectable()
export class SteamCommunityService {
  private readonly baseUrl = process.env.STEAM_COMMUNITY_URL;
  private readonly steamProtocol = process.env.STEAM_PROTOCOL;
  private readonly baseSteamId64 = process.env.BASE_STEAM_ID64;

  constructor(private readonly httpService: HttpService) {}

  async getMiniProfile(
    steamID32: string,
    language: string,
  ): Promise<MiniProfileDto> {
    try {
      const url = `${this.baseUrl}miniprofile/${steamID32}/json/?l=${language}`;
      const response = await firstValueFrom(this.httpService.get(url));
      const steamId64 = BigInt(this.baseSteamId64!) + BigInt(steamID32);
      response.data.profile_url = `${this.baseUrl}profiles/${steamId64}`;
      response.data.profile_steam_url = `${this.steamProtocol}openurl/${this.baseUrl}profiles/${steamId64}`;
      return response.data;
    } catch (error) {
      throw new HttpException(ErrorMessage.FETCH_DATA_ERROR, HttpStatus.BAD_GATEWAY);
    }
  }
}
