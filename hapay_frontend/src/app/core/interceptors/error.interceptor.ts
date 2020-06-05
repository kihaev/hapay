import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { catchError, retry, switchMap, filter, take, finalize } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isRefreshingToken: boolean = false;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private readonly router: Router,
        private readonly toastr: ToastrService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private readonly authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                return throwError(errorResponse);
            }),
            retry(1),
            catchError((errorResponse: HttpErrorResponse) => {
                let errorMessage = "";
                if (errorResponse.error instanceof Event) {
                    errorMessage = errorResponse.status !== 0 ? errorResponse.message : "Server is not available. Please try again later";
                    this.toastr.error(errorMessage, "Error", {
                        closeButton: true,
                        enableHtml: true
                    });
                    return throwError(errorMessage);
                }
                if (errorResponse.status === 401 && isPlatformBrowser(this.platformId)) {
                    this.authenticationService.logout();
                    this.router.navigate(['account/signin']);
                    return throwError(errorResponse);
                }
                // if (errorResponse.status === 419 && isPlatformBrowser(this.platformId)) {
                //     return this.handle419Error(request, next);
                // }
                if (errorResponse.status === 404) {
                    return throwError(errorResponse);
                }
                errorMessage = errorResponse.error.error || errorResponse.error || errorResponse;
                if (errorResponse.error.currentTarget) {
                    errorMessage = errorResponse.message;
                }

                if (!errorMessage) {
                    errorMessage = `Error Code: ${errorResponse.status}<br /> Message: ${errorResponse.message}`;
                }
                this.toastr.error(errorMessage, "Error", {
                    closeButton: true,
                    enableHtml: true
                });
                return throwError(errorMessage);
            })
        );
    }

    // private handle419Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (this.isRefreshingToken) {
    //         return this.tokenSubject.pipe(filter(token => token != null),
    //             take(1),
    //             switchMap(token => {
    //                 return next.handle(this.addTokenToRequest(request, token));
    //             }), catchError(err => {
    //                 return throwError(err);
    //             }));
    //     }

    //     this.isRefreshingToken = true;
    //     this.tokenSubject.next(null);

    //     return this.refresh().pipe(switchMap((responce: any) => {
    //         if (!responce) {
    //             this.authenticationService.logout();
    //             return throwError("");
    //         }

    //         this.tokenSubject.next(responce);
    //         this.authenticationService.updateTokens(responce.refreshToken, responce.accessToken);
    //         request = this.addTokenToRequest(request, responce.accessToken);
    //         return next.handle(request);
    //     }), catchError(err => {
    //         if (err instanceof HttpErrorResponse) {
    //             switch (err.status) {
    //                 case 401 || 403: {
    //                     this.authenticationService.logout();
    //                     this.router.navigate(['account/signin']);
    //                     return throwError(err);
    //                 }
    //                 default:
    //                     return throwError(err);
    //             }
    //         }
    //         return throwError(err);
    //     }), finalize(() => {
    //         this.isRefreshingToken = false;
    //     }));
    // }

    // private refresh(): Observable<any> {
    //     let refreshToken = this.authenticationService.user.refreshToken;
    //     if (!refreshToken) {
    //         this.authenticationService.logout();
    //         this.router.navigate(['account/signin']);
    //         return throwError("");
    //     }
    //     return this.authenticationService.refreshToken();
    // }

    private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
}