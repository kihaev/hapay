import { NgModule } from "@angular/core";
import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { MatMenuModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
    declarations: [AboutUsComponent],
    imports: [
        AboutUsRoutingModule,
        MatMenuModule,
        CommonModule,
        SlickCarouselModule,
    ],
    providers: []
})

export class AboutUsModule {}