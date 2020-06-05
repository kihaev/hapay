import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule, MatMenuModule, MatRadioModule } from "@angular/material";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { ShowMyFilesRoutingModule } from './show-my-files.routing-module';
import { ShowMyFilesComponent } from './show-my-files.component';

@NgModule({
    declarations: [ShowMyFilesComponent],
    imports: [
        SharedModule,
        MatInputModule,
        ShowMyFilesRoutingModule,
        SlickCarouselModule,
        MatMenuModule,
        MatRadioModule,
    ],
    providers: [
    ]
})
export class ShowMyFilesModule { }
