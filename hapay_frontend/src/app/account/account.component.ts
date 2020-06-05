import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public logoClick(): void {

  }

  public close(): void {
  }
}
