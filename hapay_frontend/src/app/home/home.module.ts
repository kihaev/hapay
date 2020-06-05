import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule, MatMenuModule, MatRadioModule } from "@angular/material";
import { SlickCarouselModule } from "ngx-slick-carousel";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        SharedModule,
        MatInputModule,
        HomeRoutingModule,
        SlickCarouselModule,
        MatMenuModule,
        MatRadioModule,
    ],
    providers: [
    ]
})
export class HomeModule { }
