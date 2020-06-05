import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FileHelper {

    public getFileExtension(fileName: string): string {
        const fileExtension = fileName.split('.').pop();
        return fileExtension;
    }

    public getFileSize(file: File): number {
        const fileSize = file.size / 1024;
        return fileSize;
    }

    public fileToBase64(file: File): Promise<string> {
        return new Promise((res, rej) => {
            let fileReader = new FileReader();
            fileReader.onloadend = function () {
                res(fileReader.result.toString());
            };
            fileReader.readAsDataURL(file);
        });
    }
}