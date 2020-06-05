import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from 'src/app/contact-us/contact-us-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule
  ],
  declarations: [ContactUsComponent],
  exports: [ContactUsComponent]
})
export class ContactUsModule { }
