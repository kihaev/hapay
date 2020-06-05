import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AppResolitionService } from 'src/app/services/app-resolution.service';

const ROUTES_WITHOUT_HEADER = [
  "/account/signin",
  "/account/signup"
]

const ROUTES_WITHOUT_FOOTER = [
  "/account/signin",
  "/account/signup",
  "/basket"
]

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer: MatSidenav;
  private _isSmallResolution: boolean;

  public isHideHeader = false;
  public isHideFooter = false;

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  public isHandset: Observable<boolean> = this.appResolitionService.getIsScreenMobile().pipe(map((result) => {
    let isSmall = result;
    if (isSmall === this._isSmallResolution) {
      return;
    }
    this.drawer.close();
    this._isSmallResolution = isSmall;
    return isSmall;
  }), shareReplay())

  constructor(private breakpointObserver: BreakpointObserver,
    private readonly appResolitionService: AppResolitionService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router) {
  }

  ngOnInit(): void {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.drawer.close();
      }
      if (event instanceof NavigationEnd) {
        this.isHideFooter = false;
        this.isHideHeader = false;

        if (ROUTES_WITHOUT_FOOTER.some(route => event.url.includes(route))) {
          this.isHideFooter = true;
        }
        
        if (ROUTES_WITHOUT_HEADER.some(route => event.url.includes(route))) {
          this.isHideHeader = true;
        }        
      };
    })
  }
}
