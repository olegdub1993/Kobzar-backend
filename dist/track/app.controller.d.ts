import { AppService } from './track.service';
export declare class AppController {
    private appService;
    constructor(appService: AppService);
    getUsers(): string;
}
