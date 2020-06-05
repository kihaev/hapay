import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "angularx-social-login";
import {
    FacebookLoginProvider,
    GoogleLoginProvider
} from "angularx-social-login";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieWrapperService } from 'src/app/services/cookie-wrapper.service';
import { takeUntil } from 'rxjs/operators';
import { LoginViewModel } from 'src/app/shared/models/account/login-view.model';
import { SignInAccountViewModel } from 'src/app/shared/models/account/signIn-account.view.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: "base-auth",
    templateUrl: "./base-auth.component.html",
})
export class BaseAuthComponent implements OnDestroy {
    public isPasswordShowed: boolean = false;
    public email: string;
    public password: string;
    public rememberMe: boolean = false;
    public returnUrl: string;
    protected onDestroy = new Subject<void>();

    constructor(
        public router: Router,
        public toastr: ToastrService,
        public authService: AuthService,
        public cookieWrapperService: CookieWrapperService,
        public authenticationService: AuthenticationService
    ) { }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    public signInWithGoogle(): void {
        var providerName = "google";
        this.authService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((userdata: any) => {
                this.authenticate(this, this.socialLoginCallback, userdata, providerName);
            })
            .catch(() => { });
    }

    public signInWithFB(): void {
        var providerName = "facebook";
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData: any) => {
            this.authenticate(this, this.socialLoginCallback, userData, providerName);
        }).catch(() => { });
    }

    public showPassword(element: HTMLInputElement): void {
        this.isPasswordShowed = !this.isPasswordShowed;
        element.attributes["type"].value = this.isPasswordShowed ? "text" : "password";
    }

    protected authenticate(scope: BaseAuthComponent, callback, userData?, providerName?) {
        const fingerprintPromise = this.authenticationService.getFingerPrint();
        fingerprintPromise.then((fingerprint: string) => {
            callback(scope, fingerprint, userData, providerName);
        }, reason => {
            throw reason;
        });
    }

    protected loginCallback(scope: BaseAuthComponent, fingerprint: string) {
        let model: LoginViewModel = {
            deviceFingerprint: fingerprint,
            email: scope.email,
            password: scope.password,
            rememberMe: scope.rememberMe
        }
        console.log(scope)
        scope.authenticationService.login(model)
            .pipe(takeUntil(scope.onDestroy))
            .subscribe(
                (data: SignInAccountViewModel) => {
                    scope.authenticationService.user = data;
                    scope.toastr.success("Success login");
                    scope.router.navigateByUrl('/');
                },
                error => {
                    if (error.error) {
                        scope.toastr.error(error.error);
                        throw error;
                    }
                }
            );
    }

    protected socialLoginCallback(scope: BaseAuthComponent, fingerprint: string, userdata: any, providerName: string) {
        scope.authenticationService.externalProviderLogin(providerName, userdata.authToken, fingerprint)
            .pipe(takeUntil(scope.onDestroy))
            .subscribe((data: any) => {
                scope.authenticationService.user = data.authData;
            });
    }
}