import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-in-header',
  templateUrl: './logged-in-header.component.html',
  styleUrls: ['../not-logged-in-header/not-logged-in-header.component.scss']
})
export class LoggedInHeaderComponent implements OnInit {
  @Input() drawer: MatSidenav;
  @Input() isHandset: any;
  public notExistAvatar = "";
  public avatarUrl = "";

  constructor(
    private readonly router: Router,
    private readonly cfg: ChangeDetectorRef,
    public readonly authService: AuthenticationService,) { }

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
