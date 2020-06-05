import { Injectable } from "@angular/core";
import loadImage from 'blueimp-load-image';

@Injectable()
export class ImageUploadService {
  public getImageBase64StringWithCanvas(blobOrFile: File) {
    return new Promise<string>((resolve, reject) => {
      loadImage.parseMetaData(blobOrFile, data => {
        let orientation = 0;
        if (data.exif) {
          orientation = data.exif.get("Orientation");
        }

        loadImage(
          blobOrFile,
          (canvas: any) => {
            const base64data = canvas.toDataURL("image/jpeg");
            if (!base64data) {
              throw new Error("Сannot generate string");
            }

            resolve(base64data);
          },
          {
            canvas: true,
            orientation: orientation
          }
        );
      });
    });
  }
}
