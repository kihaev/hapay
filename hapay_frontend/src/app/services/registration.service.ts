import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupAccountViewModel } from '../shared/models/account/signup-account.view.model';

@Injectable({
    providedIn: "root"
})
export class RegistrationService {

    constructor(private http: HttpClient) { }
    // SignupAccountViewModel
    public register(model: any): Observable<any> {
        const headerDict = {
            'Content-Type': 'application/json charset=utf8',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
          }
          
        const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders({'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Headers': 'Content-Type', 
            // "Accept-Encoding": 'gzip, deflate, br',
            // 'Accept': '*/*',
        }), 
        };
        return this.http.post<any>(`${environment.apiUrl}users/register`, model, requestOptions);
    }

    // public kek(): Observable<any> {
    //     return this.http.post<any>(`${environment.apiUrl}users/register`, {"user":
    //     {"email":"yurakikhaiev1@gmail.com",
    //     "username":"kihaev1",
    //     "password":"12345678"}
    //     })
    // }
    
    // public kek(): Observable<any> {
    //     return this.http.post<any>(`${environment.apiUrl}users/register`, {"user":
    //     {"email":"yurakikhaiev1@gmail.com",
    //     "username":"kihaev1",
    //     "password":12345678}
    //     })
    // }

    public resendConfirmationLink(email: string, returnUrl: string, isNeedToVisit: boolean): Observable<void> {
        const obj = {
            email: email,
            returnUrl: returnUrl,
            isNeedToVisit: isNeedToVisit
        };
        return this.http.post<void>(`${environment.identityUrl}resendConfirmationLink`, obj);
    }

    public emailConfirm(userId: string, code: string): Observable<Object> {
        const model = {
            userId: userId,
            code: code
        };
        return this.http.post(`${environment.identityUrl}emailConfirm`, model);
    }
}