import { Model } from 'mongoose';
import { Response } from './url.model';
export declare class UrlService {
    private urlModel;
    private URLs;
    constructor(urlModel: Model<Response>);
    shortenURL(url: string): Promise<Response>;
    getURLs(): Promise<Response[]>;
    private generateResource;
}
