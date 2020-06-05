import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService, CookieModule } from "ngx-cookie";
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LoginOpt, AuthService } from "angularx-social-login";
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { environment } from 'src/environments/environment';
import { CookieWrapperService } from './services/cookie-wrapper.service';
import { ToastrModule } from "ngx-toastr";
import { AppLayoutModule } from './shared/components/layout/layout.module';
import { FormsModule } from '@angular/forms';
import { FileService } from './services/file-service';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'Hapay' }),
    CoreModule,
    CommonModule,
    AppLayoutModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule
  ],
  exports: [CommonModule],
  providers: [
    AuthService,
    CookieService,
    CookieWrapperService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    FileService,
    // GlobalSharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function provideConfig() {
  let googleOptions: LoginOpt = {
    client_id: environment.googleClientId,
    ux_mode: "popup"
  };

  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.googleClientId, googleOptions)
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.facebookAppId)
    }
  ]);
  return config;
}
