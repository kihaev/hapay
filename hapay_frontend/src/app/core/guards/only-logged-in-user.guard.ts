import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }
    return false;
  }
}
