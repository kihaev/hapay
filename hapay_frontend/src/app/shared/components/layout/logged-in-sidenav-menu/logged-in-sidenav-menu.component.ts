import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-logged-in-sidenav-menu',
  templateUrl: './logged-in-sidenav-menu.component.html',
  styleUrls: ['./logged-in-sidenav-menu.component.scss']
})
export class LoggedInSidenavMenuComponent implements OnInit {
  @Input() drawer: MatSidenav;
  @Input() isHandset: any;
  public notExistAvatar = "";
  public avatarUrl = "";

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(private readonly router: Router,
              public authService: AuthenticationService) { }

  ngOnInit() {
    // this.avatarUrl = this.authService.user.user.userPhoto;
    this.authService.getUserImgUrl.subscribe((val) => {
        this.avatarUrl = val;
    });
  }

  public signOut() {
    this.authService.logout();
    window.location.href = `/`;
  }

  public navigate(url: string) {
    this.router.navigate([url]);
  }
}
