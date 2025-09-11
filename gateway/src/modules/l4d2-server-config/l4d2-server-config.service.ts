import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class L4d2ServerConfigService {
  constructor(private readonly httpService: HttpService) {}
  
}
