import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/validators/password-validator';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MyInfoEditing } from 'src/app/shared/enums';
import { AppResolitionService, AuthenticationService, LoaderBtnStateService } from 'src/app/services';
import { takeUntil, finalize } from 'rxjs/operators';
import { ChangePasswordViewModel } from 'src/app/shared/models/account';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  private _onDestroy = new Subject<void>();

  @Input() public isPasswordEditing: MyInfoEditing;

  public passwordForm: FormGroup;
  public isMobileResolution: boolean = false;

  get isEditing() {
    return this.isPasswordEditing === MyInfoEditing.Password;
  }

  constructor(private toastService: ToastrService,
    private readonly appResolitionService: AppResolitionService,
    private readonly loaderBtnStateService: LoaderBtnStateService,
    private readonly authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() {
    this.appResolitionService.getIsScreenMobile().subscribe((val) => {
      this.isMobileResolution = val;
    });
  }

  public isShowValidationList: boolean = false;
  public isCurrentPasswordShowing: boolean = false;
  public isNewPasswordShowing: boolean = false;

  public toggleValidationList() {
    this.isShowValidationList = !this.isShowValidationList;
  }

  public showPassword(isNewPassword: boolean): void {
    if (isNewPassword) {
      this.isCurrentPasswordShowing = !this.isCurrentPasswordShowing;
      return;
    }
    this.isNewPasswordShowing = !this.isNewPasswordShowing;
  }

  public updatePassword() {
    if (this.passwordForm.invalid) {
      this.toastService.warning("Passwords is invalid");
      this.isShowValidationList = true;
      return;
    }

    let model: ChangePasswordViewModel = {
      newPassword: this.passwordForm.value.password,
      oldPassword: this.passwordForm.value.currentPassword
    };
    this.loaderBtnStateService.showLoader();
    this.authenticationService.changePassword(model).pipe(takeUntil(this._onDestroy),
      finalize(() => {
        this.loaderBtnStateService.hideLoader();
        this.isShowValidationList = false;
      })).subscribe((res) => {
        this.passwordForm.reset();
        this.toastService.success("Password has been changed successfully");
      });
  }

  private createForm() {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, PasswordValidator.strong])
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
