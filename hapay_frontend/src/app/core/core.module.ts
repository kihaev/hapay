import { Optional, SkipSelf, NgModule } from '@angular/core';
import { throwIfAlreadyLoaded, OnlyLoggedOutUsersGuard, OnlyLoggedInUsersGuard } from './guards';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor, ErrorInterceptor, NotificationInterceptor } from './interceptors';

@NgModule({
  imports: [HttpClientModule],
  exports: [],
  declarations: [],
  providers: [
    OnlyLoggedOutUsersGuard,
    OnlyLoggedInUsersGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}