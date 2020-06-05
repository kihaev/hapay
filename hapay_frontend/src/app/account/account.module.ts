import { NgModule } from "@angular/core";
import { SignInComponent } from './signin/sign-in.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { BaseAuthComponent } from './base-auth/base-auth.component';
import { AstronetButtonModule } from '../shared/components/buttons/astronet-button/astronet-button.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { SignUpComponent } from './signup/sign-up.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const ENTRYCOMPONETNST = [
  SignInComponent,
  SignUpComponent,
  AccountComponent,
  BaseAuthComponent,
  EmailConfirmComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent
];

@NgModule({
  imports: [
    AccountRoutingModule,
    AstronetButtonModule,
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
  ],
  entryComponents: [
    ...ENTRYCOMPONETNST
  ],
  declarations: [
    ...ENTRYCOMPONETNST
  ],
})
export class AccountModule { }
