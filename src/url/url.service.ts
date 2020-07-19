import { Injectable } from '@nestjs/common';
import * as RandString from 'randomatic';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from './url.model';

@Injectable()
export class UrlService {
  private URLs: string[];

  constructor(@InjectModel('URL') private urlModel: Model<Response>) {}

  async shortenURL(url: string): Promise<Response> {
    const shortened: string = this.generateResource();

    const urlBody = new this.urlModel({
      original: url,
      shortened: `https://pbid.io/${shortened}`,
    });

    let res: Response;
    try {
        res = await urlBody.save();
        return res;
    } catch (error) {
        return error;
    }
  }

  async getURLs(): Promise<Response[]> {
      const urls = await this.urlModel.find().exec();
      return [...urls];
  }

  private generateResource(): string {
    return RandString('a0a0', 8);
  }
}
