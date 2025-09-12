import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SteamStoreService {
  private readonly baseUrl = process.env.STEAM_STORE_URL;

  constructor(private readonly httpService: HttpService) {}
  
}
