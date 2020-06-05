import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppModule } from "./app.module";

@NgModule({
  imports: [
    AppModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      // The server provides these in main.server
      provide: REQUEST,
      useFactory: getRequest,
    },
    { provide: 'ORIGIN_URL', useValue: location.origin }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }

// the Request object only lives on the server
export function getRequest(): any {
  return { headers: { cookie: document.cookie } };
}
