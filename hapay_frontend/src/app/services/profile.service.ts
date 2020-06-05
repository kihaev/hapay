import { Injectable } from "@angular/core";
import { UpdateProfileInfoModel, ProfileInfoModel } from 'src/app/shared/models/my-info';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProfileService {
    constructor(private http: HttpClient) { }

    public getAccountProfile(): Observable<ProfileInfoModel> {
        return this.http.get<ProfileInfoModel>(`${environment.apiUrl}profile/getAccount`);
    }

    public updateAccountProfile(profileUpdateModel: UpdateProfileInfoModel): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}profile/updateAccount`, profileUpdateModel);
    }

    public updateProfilePhoto(image: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}profile/updatePhoto`, { content: image }, { responseType: 'text' });
    }
}