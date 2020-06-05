import { Component, OnDestroy, Inject, PLATFORM_ID, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { takeUntil } from 'rxjs/operators';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
    selector: "app-email-confirm",
    templateUrl: "./email-confirm.component.html",
    styleUrls: ["./email-confirm.component.scss"]
})
export class EmailConfirmComponent implements OnInit, OnDestroy {
    private userId: string;
    private code: string;
    private returnUrl: string = "/account/signin";
    private onDestroy = new Subject<void>();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private readonly registrationService: RegistrationService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        this.userId = this.route.snapshot.queryParams["userId"];
        this.code = this.route.snapshot.queryParams["code"];
        if (!this.userId || !this.code) {
            return;
        }
        this.registrationService.emailConfirm(this.userId, this.code)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(
                (data: any) => {
                    if (data) {
                        if (isPlatformBrowser(this.platformId)) {
                            this.toastr.success("Account was successfully activated", "Success!", { closeButton: true });
                        }
                        this.router.navigate([this.returnUrl]);
                    }
                },
                error => {
                    throw error;
                }
            );
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
