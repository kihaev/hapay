import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CookieWrapperService } from './cookie-wrapper.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as Fingerprint2 from "../../../node_modules/fingerprintjs2";
import { LoginViewModel } from '../shared/models/account/login-view.model';
import { SignInAccountViewModel, SignInAccountUserDataViewModel } from '../shared/models/account/signIn-account.view.model';
import { map } from 'rxjs/operators';
import { ResetPasswordViewModel } from '../shared/models/account/reset-password.view.model';
import { ChangePasswordViewModel } from 'src/app/shared/models/account';
import { ConfirmPhoneNumberViewModel } from 'src/app/shared/models/account/confirm-phone-number.view.model';
import { MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS } from '@angular/material';
import { Router } from '@angular/router';

const constants = {
    currentUser: "currentUser",
    redisToken: "redisToken"
};

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
    public isLog: boolean = false
    @Output() getLoginIn: EventEmitter<any> = new EventEmitter();
    @Output() getUserImgUrl: EventEmitter<string> = new EventEmitter();

    private currentUserSubject: BehaviorSubject<SignInAccountViewModel>;

    public currentUser: Observable<SignInAccountViewModel>;
    public currentDeviceId: string;

    constructor(
        private http: HttpClient,
        private readonly router: Router,
        private cookieWrapperService: CookieWrapperService
    ) {
        this.currentUserSubject = new BehaviorSubject<SignInAccountViewModel>(this.getUserFromCookie());
        this.currentUser = this.currentUserSubject.asObservable();
        this.getFingerPrint().then((val) => {
            this.currentDeviceId = val;
        })
    }
    // LoginViewModel
    public login(model: any): Observable<SignInAccountViewModel> {
        // let kek = {
        //     token: "kek",
        //     user: {
        //         userId: "666",
        //         userName: "Bogdan",
        //         userEmail: "kek@gmail.com",
        //         userPhoto: null,
        //         userRoleId: 1
        //     },
        //     refreshToken: "kek1"
        // }
        // this.currentUserSubject.next(kek);
        // return of(kek);
        return this.http.post<SignInAccountViewModel>(`${environment.apiUrl}users/login`, model)
            .pipe(map((response: SignInAccountViewModel) => {
                
                if (response.user.token && response.user.username) {
                    this.currentUserSubject.next(response);
                    this.router.navigate(['/'])
                    this.isLog = true
                    return response;
                }
            }));
    }

    public logout(): void {
        this.cookieWrapperService.removeItem(constants.currentUser);
        this.isLog = false
        this.currentUserSubject.next(null);
    }

    public isLoggedIn(): boolean {
        return this.isLog;
        return !!this.user;
    }

    public isLoggedOut(): boolean {
        return !this.isLog;
        return !this.user;
    }

    public get user(): SignInAccountViewModel {
        const user = this.getUserFromCookie();
        if (!user) {
            return null;
        }

        this.currentUserSubject.next(user);
        // this.getUserImgUrl.next(user.user.userPhoto);
        return this.currentUserSubject.value;
    }

    public set user(user: SignInAccountViewModel) {
        this.cookieWrapperService.setItem(
            constants.currentUser,
            JSON.stringify(user)
        );

        this.currentUserSubject.next(user);
        // console.log(`Set user ${JSON.stringify(user.user.userId)}`);
        this.getLoginIn.emit({ status: true });
        // this.getUserImgUrl.emit(user.user.userPhoto);
    }

    public updateTokens(refreshToken: string, accessToken: string) {
        let newData = { ...this.user };
        newData.user.token = accessToken;
        // newData.refreshToken = refreshToken;
        this.user = newData;
    }

    // public get userPhotoUrl(): string {
    //     return this.user.user.userPhoto;
    // }

    public changeUserPhoto(value: string) {
        let newData = { ...this.user };
        // newData.user.userPhoto = value;
        this.user = newData;
    }

    public forgotPassword(email: string): Observable<Object> {
        const forgotForm = {
            Email: email
        };
        return this.http.post(`${environment.identityUrl}forgotPassword`, forgotForm);
    }

    public resetPassword(resetForm: ResetPasswordViewModel): Observable<Object> {
        return this.http.post(`${environment.identityUrl}resetPassword`, resetForm);
    }

    public getFingerPrint(): Promise<string> {
        return new Promise((resolve, reject) => {
            Fingerprint2.getV18((fingerprint: string) => {
                if (!fingerprint) {
                    reject();
                    return;
                }
                resolve(fingerprint);
            });
        });
    }

    public changePassword(resetForm: ChangePasswordViewModel): Observable<void> {
        return this.http.post<void>(`${environment.identityUrl}changePassword`, resetForm);
    }

    public externalProviderLogin(providerName: string, token: string, fingerprint: string): Observable<Object> {
        const loginForm = {
            providerName: providerName,
            token: token,
            deviceFingerprint: fingerprint
        };
        return this.http.post(`${environment.apiUrl}/providerLogin`, loginForm);
    }

    public refreshToken(): Observable<any> {
        return this.http.post<SignInAccountViewModel>(`${environment.identityUrl}refreshToken`, {
            deviceFingerprint: this.currentDeviceId,
            accessToken: this.user.user.token,
            // refreshToken: this.user.refreshToken
        }).pipe(map((response: any) => {
            this.user.user.token = response.token;
            // this.user.refreshToken = response.refreshToken;
            this.currentUserSubject.next(this.user);
            return response;
        }));
    }

    private getUserFromCookie(): SignInAccountViewModel {
        const userData = this.cookieWrapperService.getItem(constants.currentUser);
        return !userData ? null : JSON.parse(userData);
    }

    public sendVeridicationCode(): Observable<any> {
        return this.http.get(`${environment.identityUrl}sendVerificationCode`);
    }

    public verifyPhoneCode(model: ConfirmPhoneNumberViewModel): Observable<any> {
        return this.http.post(`${environment.identityUrl}confirmPhoneNumber`, model);
    }
}
