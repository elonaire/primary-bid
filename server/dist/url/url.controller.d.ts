import { UrlService } from './url.service';
import { Response } from './url.model';
export declare class UrlController {
    private urlService;
    constructor(urlService: UrlService);
    shortenURL(url: string): Promise<Response>;
    getURLs(): Promise<Response[]>;
}
