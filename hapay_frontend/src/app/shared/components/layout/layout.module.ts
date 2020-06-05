import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatMenuModule, MatMenuTrigger } from '@angular/material'
import { SharedModule } from '../../shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LayoutComponent } from './layout.component';
import { LoggedInHeaderComponent } from './logged-in-header/logged-in-header.component';
import { NotLoggedInHeaderComponent } from './not-logged-in-header/not-logged-in-header.component';
import { LoggedInSidenavMenuComponent } from './logged-in-sidenav-menu/logged-in-sidenav-menu.component';
import { NotLoggedInSidenavMenuComponent } from './not-logged-in-sidenav-menu/not-logged-in-sidenav-menu.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MainFooterComponent } from 'src/app/shared/components/layout/main-footer/main-footer.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const LAYOUT_COMPONENTS = [
  LayoutComponent,
  LoggedInHeaderComponent,
  NotLoggedInHeaderComponent,
  LoggedInSidenavMenuComponent,
  NotLoggedInSidenavMenuComponent,
  MainFooterComponent
];

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    NgxSpinnerModule,
    LazyLoadImageModule
  ],
  exports: [
    ...LAYOUT_COMPONENTS
  ],
  entryComponents: [
    ...LAYOUT_COMPONENTS
  ],
  declarations: [
    ...LAYOUT_COMPONENTS
  ],
})
export class AppLayoutModule { }
