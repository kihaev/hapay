import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-not-logged-in-header',
  templateUrl: './not-logged-in-header.component.html',
  styleUrls: ['./not-logged-in-header.component.scss']
})
export class NotLoggedInHeaderComponent implements OnInit {

  @Input() drawer: MatSidenav;
  @Input() isHandset: any;
  constructor() { }

  ngOnInit() {
  }
}
