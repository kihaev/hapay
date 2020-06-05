import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable()
export class CookieWrapperService {

    constructor(
        private cookieService: CookieService,
        @Inject(REQUEST) private request: any,
        @Inject(PLATFORM_ID) private platformId: any
    ) { }

    public getItem(key: string): any {
        if (isPlatformServer(this.platformId)) {
            const serverCookie = this.request && this.request.cookies ? this.request.cookies[key] : undefined;
            return serverCookie;
        }
        const value = this.cookieService.get(key);
        return value;
    }

    public removeItem(key: string): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        return this.cookieService.remove(key);
    }

    public setItem(key: string, value: string, options?: CookieOptions): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        return this.cookieService.put(key, value, options);
    }
}
