import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "my-info",
    templateUrl: "./my-info.component.html",
    styleUrls: ["./my-info.component.scss"]
})
export class MyInfoComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit() { }

    ngOnDestroy(): void {
    }
}
