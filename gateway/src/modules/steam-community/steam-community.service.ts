import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SteamCommunityService {
  constructor(private readonly httpService: HttpService) {}
  
}
