import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ErrorMessage } from 'src/common/enums/error-message.enum';

@Injectable()
export class L4d2ServerConfigService {
  constructor(private readonly httpService: HttpService) {}

  async getMotd(): Promise<string> {
    try {
      const url = process.env.L4D2_SERVER_CONFIG_URL! + process.env.MOTD!;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException(ErrorMessage.FETCH_DATA_ERROR, HttpStatus.BAD_GATEWAY);
    }
  }
}
