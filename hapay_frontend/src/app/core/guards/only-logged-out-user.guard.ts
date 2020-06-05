import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class OnlyLoggedOutUsersGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLoggedOut()) {
      return true;
    }
    return false;
  }
}
