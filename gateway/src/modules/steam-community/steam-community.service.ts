import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ErrorMessage } from '../../common/enums/error-message.enum';
import { MiniProfileDto } from './dto/mini-profile.dto';
import { CollectionItemDto, WorkshopCollectionDto } from './dto/workshop-collection.dto';
import * as cheerio from 'cheerio';

@Injectable()
export class SteamCommunityService {
  private readonly baseUrl = process.env.STEAM_COMMUNITY_URL;
  private readonly steamProtocol = process.env.STEAM_PROTOCOL;
  private readonly baseSteamID64 = process.env.BASE_STEAM_ID64;

  constructor(private readonly httpService: HttpService) {}

  async getMiniProfile(
    steamID32: string,
    language: string,
  ): Promise<MiniProfileDto> {
    try {
      const url = `${this.baseUrl}miniprofile/${steamID32}/json/?l=${language}`;
      const response = await firstValueFrom(this.httpService.get(url));
      const steamID64 = BigInt(this.baseSteamID64!) + BigInt(steamID32);
      response.data.profile_url = `${this.baseUrl}profiles/${steamID64}`;
      response.data.profile_steam_url = `${this.steamProtocol}openurl/${this.baseUrl}profiles/${steamID64}`;
      return response.data;
    } catch (error) {
      throw new HttpException(ErrorMessage.FETCH_DATA_ERROR, HttpStatus.BAD_GATEWAY);
    }
  }

  async getWorkshopCollection(workshopId: string): Promise<WorkshopCollectionDto> {
    try {
      const url = `${this.baseUrl}sharedfiles/filedetails/?id=${workshopId}`;
      const response = await firstValueFrom(this.httpService.get(url));
      const html = response.data as string;

      const $ = cheerio.load(html);

      const title = $('div.collectionHeader div.workshopItemTitle').first().text().trim();


      const descriptionItems: any[] = [];
      $('div.workshopItemDescriptionForCollection div.bb_table').each((_, table) => {
      $(table)
        .find('div.bb_table_tr')
        .each((i, row) => {
          // Bỏ qua dòng header
          if ($(row).find('div.bb_table_th').length) return;

          const tds = $(row).find('div.bb_table_td');
          const game = $(tds[0]).text().trim();
          const name = $(tds[1]).text().trim();
          const downloadEl = $(tds[2]).find('a.bb_link').first();
          const downloadUrl = downloadEl.attr('href') ?? '';
          const downloadLabel = downloadEl.text().trim();
          const version = $(tds[3]).text().trim();

          descriptionItems.push({
            game,
            name,
            version,
            downloadUrl,
            downloadLabel,
          });
        });
      });

      const items: CollectionItemDto[] = [];
      $('div.collectionChildren div.collectionItem').each((_, el) => {
        const $el = $(el);
        const url = $el.find('a[href*="/sharedfiles/filedetails/"]').first().attr('href') ?? '';
        items.push({
          url,
          steamUrl: url ? `${this.steamProtocol}${url}` : '',
          imgUrl: $el.find('img.workshopItemPreviewImage').attr('src') ?? '',
          title: $el.find('div.workshopItemTitle').text().trim(),
          authorName: $el.find('span.workshopItemAuthorName a').text().trim(),
          authorUrl: $el.find('span.workshopItemAuthorName a').attr('href') ?? '',
          rateImgUrl: $el.find('img.fileRating').attr('src') ?? '',
        });
      });

      return { title, descriptionItems, items };

    } catch (error) {
      throw new HttpException(ErrorMessage.FETCH_DATA_ERROR, HttpStatus.BAD_GATEWAY);
    }
  }
}
