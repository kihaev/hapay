import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { validationPatterns } from 'src/app/shared/helpers/validationPatterns';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { takeUntil } from 'rxjs/operators';

const SHARED_PATTERNS = validationPatterns().sharedPatterns;

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public forgotPasswordForm: FormGroup;
  public submitted: boolean;
  public showEmailRequirements: boolean;
  private _onDestroy = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(SHARED_PATTERNS.emailAddress)]]
    });
  }

  public forgotPassword(): void {
    if (this.forgotPasswordForm.invalid) {
      this.toastr.error("Email is incorrect", "Error occured!", {
        closeButton: true
      });
      this.submitted = false;
      return;
    }

    this.authenticationService.forgotPassword(this.forgotPasswordForm.value.email)
      .pipe(takeUntil(this._onDestroy))
      .subscribe(
        () => {
          this.submitted = true;
          this.router.navigate(["/account/complete-password"], {
            state: {
              email: this.forgotPasswordForm.value.email
            }
          });
        },
        error => {
          this.submitted = false;
          throw error;
        }
      );
  }

  public showRequirementsForEmail(): void {
    this.showEmailRequirements = !this.showEmailRequirements;
  }

  public onClickOutsideInfo(): void {
    if (this.showEmailRequirements) {
      this.showRequirementsForEmail();
    }
  }

  public getIconStyle(invalid: boolean): string {
    return invalid ? "show-info" : "show-errors";
  }

  public backToLogin() {
    let queryParams = {};
    this.router.navigate(['/account/signin'], { queryParams: queryParams });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
