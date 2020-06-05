import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, fromEvent } from 'rxjs';
import { throttleTime, map, distinctUntilChanged, startWith } from 'rxjs/operators';


@Injectable({
    providedIn: "root"
})
export class AppResolitionService {
    private _isMobile: boolean = false;
    private isScreenMobile: Observable<boolean> = new Observable<boolean>();

    public screenSizeChangedToMobile: Observable<boolean> = new Observable<boolean>();

    get isMobile(): boolean {
        return this._isMobile;
    }
    set isMobile(value: boolean) {
        this._isMobile = value;
    }

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        if (!isPlatformBrowser(this.platformId)) {
            this.isScreenMobile = of(false);
            return;
        }

        const checkScreenMobile = () => window.innerWidth <= 600;

        this._isMobile = checkScreenMobile();

        this.screenSizeChangedToMobile = fromEvent(window, 'resize').pipe(
            throttleTime(500),
            map(checkScreenMobile)
        ).pipe(distinctUntilChanged());

        this.isScreenMobile = this.screenSizeChangedToMobile.pipe(startWith(checkScreenMobile()));
    }

    public getIsScreenMobile(): Observable<boolean> {
        return this.isScreenMobile;
    }
}