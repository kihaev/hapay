import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule, MatMenuModule, MatRadioModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, MatChipsModule, MatButton, MatButtonModule } from "@angular/material";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { UploadFileRoutingModule } from './upload-file.routing-module';
import { UploadFileComponent } from './upload-file.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker'

@NgModule({
    declarations: [UploadFileComponent],
    imports: [
        SharedModule,
        MatInputModule,
        UploadFileRoutingModule,
        SlickCarouselModule,
        MatMenuModule,
        MatButtonModule,
        MatRadioModule,
        MatFileUploadModule,
        MatFormFieldModule,
        NgxMatDatetimePickerModule, 
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatChipsModule
    ],
    providers: [
    ], 
    bootstrap: [UploadFileComponent]
})
export class UploadFileModule { }
