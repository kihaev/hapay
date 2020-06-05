import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../../services/authentication.service";
import { tap } from "rxjs/operators";
import * as moment from 'moment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        public router: Router,
        private authenticationService: AuthenticationService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.headers.has('X-Skip-Interceptor')) {
            let headers = new HttpHeaders();
            return next.handle(request.clone({ headers }));
        }

        let headers: HttpHeaders = request.headers;
        // if (!request.headers.has("api-version")) {
        //     headers = headers.set("api-version", environment.v1);
        // }

        if (this.authenticationService.isLoggedIn() && !request.url.includes("refreshToken")) {
            headers = headers.set("Authorization", `Bearer ${this.authenticationService.user.user.token}`);
        }

        request = request.clone({
            headers: headers
        });
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => { }, (err: any) => { }));
    }
}