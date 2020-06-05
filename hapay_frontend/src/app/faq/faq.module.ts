import { NgModule } from "@angular/core";
import { FAQComponent } from './faq.component';
import { FAQRoutingModule } from './faq-routing.module';
import { MatMenuModule, MatExpansionModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { AstronetButtonModule } from '../shared/components/buttons/astronet-button/astronet-button.module';

@NgModule({
    declarations: [FAQComponent],
    imports: [
        FAQRoutingModule,
        MatMenuModule,
        MatExpansionModule,
        CommonModule,
        AstronetButtonModule
    ],
    providers: []
})

export class FAQModule { }