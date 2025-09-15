import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ErrorMessage } from '../../common/enums/error-message.enum';
import { AdminSimpleDto } from './dto/admin-simple.dto';

@Injectable()
export class L4d2ServerConfigService {
  private readonly baseUrl = process.env.L4D2_SERVER_CONFIG_URL;

  constructor(private readonly httpService: HttpService) {}

  async getAdminSimple(): Promise<AdminSimpleDto[]> {
    try {
      const url = `${this.baseUrl}addons/sourcemod/configs/admins_simple.ini`;
      const response = await firstValueFrom(this.httpService.get(url));

      const lines: string[] = response.data.split(/\r?\n/);

      const result: AdminSimpleDto[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//')) {
          continue;
        }
        // regex STEAM_X:Y:Z
        const match = line.match(/"(STEAM_\d+:\d+:\d+)"/);
        if (match) {
          const steamID = match[1];
          const parts = steamID.split(':');

          if (parts.length === 3) {
            const Y = parseInt(parts[1], 10);
            const Z = parseInt(parts[2], 10);
            const steamID32 = Z * 2 + Y;

            result.push({
              steamID,
              steamID32,
            });
          }
        }
      }

      return result;
    } catch (error) {
      throw new HttpException(ErrorMessage.FETCH_DATA_ERROR, HttpStatus.BAD_GATEWAY);
    }
  }

  async getMotd(): Promise<string> {
    try {
      const url = `${this.baseUrl}motd.txt`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException(ErrorMessage.FETCH_DATA_ERROR, HttpStatus.BAD_GATEWAY);
    }
  }
}
