import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-not-logged-in-sidenav-menu',
  templateUrl: './not-logged-in-sidenav-menu.component.html',
  styleUrls: ['../logged-in-sidenav-menu/logged-in-sidenav-menu.component.scss']
})
export class NotLoggedInSidenavMenuComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}
