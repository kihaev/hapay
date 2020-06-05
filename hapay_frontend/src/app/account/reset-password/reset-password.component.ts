import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { PasswordValidator } from "../../shared/validators/password-validator";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { ResetPasswordViewModel } from 'src/app/shared/models/account/reset-password.view.model';
import { FormTouch } from 'src/app/shared/helpers/form-touch';

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private code: string;
  private userId: string;
  public resetPasswordForm: FormGroup;
  public isChecked: boolean = true;
  public isPasswordShowed: boolean = false;

  get formControls() { return this.resetPasswordForm.controls; }

  private onDestroy = new Subject<void>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.code = this.route.snapshot.queryParams["code"];
    this.userId = this.route.snapshot.queryParams["userId"];

    this.resetPasswordForm = this.formBuilder.group({
      password: ["", [Validators.required, PasswordValidator.strong]],
      confirmPassword: ["", [Validators.required, PasswordValidator.checkPassword]]
    });
  }

  public showPassword(element: HTMLInputElement): void {
    this.isChecked = !this.isChecked;
    element.attributes["type"].value = !this.isChecked ? "text" : "password";
  }

  public resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      FormTouch.markFormGroupTouched(this.resetPasswordForm);
      this.toastr.warning('All fields must be valid');
      return;
    }

    const resetForm: ResetPasswordViewModel = {
      password: this.resetPasswordForm.value.password,
      code: this.code,
      userId: this.userId
    };

    this.authenticationService.resetPassword(resetForm).pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.toastr.success("Your password successfully changed");
      this.router.navigate(['/account/signin']);
    },
      (error) => {
        throw error;
      }
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
