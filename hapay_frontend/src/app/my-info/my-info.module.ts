import { NgModule } from '@angular/core';
import { MyInfoComponent } from './my-info.component';
import { MyInfoRoutingModule } from 'src/app/my-info/my-info-routing.module';
import { ProfileComponent } from 'src/app/my-info/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileService, ImageUploadService } from 'src/app/services';
import { MatExpansionModule, MatFormFieldModule, MatPaginatorModule, MatProgressSpinnerModule, MatDatepickerModule, MatInputModule } from '@angular/material';
import { AccountComponent } from 'src/app/my-info/profile/account/account.component';
import { PasswordComponent } from 'src/app/my-info/profile/password/password.component';
import { AstronetButtonModule } from 'src/app/shared/components/buttons/astronet-button/astronet-button.module';
import { MaterialDateAdapterModule } from 'src/app/shared/material.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { NotificationModule } from 'src/app/shared/components/notification/notification.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { CommonModule } from '@angular/common';

const ENTRYCOMPONENTS = [
  MyInfoComponent,
  AccountComponent,
  ProfileComponent,
  PasswordComponent,
]
const MATERIALMODULES = [
  MatExpansionModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatInputModule,
  MaterialDateAdapterModule
]
@NgModule({
  imports: [
    SharedModule,
    DirectivesModule,
    ClickOutsideModule,
    ...MATERIALMODULES,
    NotificationModule,
    MyInfoRoutingModule,
    AstronetButtonModule,
  ],
  declarations: [...ENTRYCOMPONENTS],
  entryComponents: [...ENTRYCOMPONENTS],
  providers: [
    ProfileService,
    ImageUploadService,
  ]
})
export class MyInfoModule { }
