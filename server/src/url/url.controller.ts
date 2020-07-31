import { Controller, Post, Body, Get } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from './url.model';

@Controller('urls')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post('shorten')
  async shortenURL(@Body('url') url: string): Promise<Response> {
    return this.urlService.shortenURL(url);
  }

  @Get('fetch')
  async getURLs(): Promise<Response[]> {
      return this.urlService.getURLs();
  }
}
