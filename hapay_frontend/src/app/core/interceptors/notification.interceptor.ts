import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { NotificationHubHandlerService } from 'src/app/services/notification-hub-handler.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
    constructor(
        public router: Router,
        private notificationHubHandlerService: NotificationHubHandlerService,
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.notificationHubHandlerService.handleResponse(event);
            }
        }, (err: any) => {
            console.log(err);
        }));
    }
}
