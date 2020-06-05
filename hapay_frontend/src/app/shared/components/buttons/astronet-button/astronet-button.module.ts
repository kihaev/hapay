import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstronetButtonComponent } from './astronet-button.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule
  ],
  declarations: [AstronetButtonComponent],
  exports: [AstronetButtonComponent]
})
export class AstronetButtonModule { }
