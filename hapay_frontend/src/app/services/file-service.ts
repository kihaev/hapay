import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FileViewModel, CreateFileDto } from '../shared/models';

@Injectable()
export class FileService {
    constructor(private http: HttpClient) { }

    public getAllFiles(): Observable<Array<FileViewModel>> {
        return this.http.get<Array<FileViewModel>>(`${environment.apiUrl}`);
    }

    public createFile(dto: CreateFileDto): Observable<any> {
        let dtoData: FormData = new FormData()
        dtoData.set('expirationDate', dto.expirationDate)
        dtoData.append('file', dto.file, dto.file.name)
        return this.http.post(`${environment.apiUrl}files`, dtoData)
    }
}