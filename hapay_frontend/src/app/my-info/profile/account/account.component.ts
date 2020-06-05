import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { MyInfoEditing, NotificationComponentIdEnum } from 'src/app/shared/enums';
import { validationPatterns } from 'src/app/shared/helpers/validationPatterns';
import { ProfileService, ImageUploadService, NotificationHubHandlerService, LoaderBtnStateService, AuthenticationService } from 'src/app/services';
import { ToastrService } from 'ngx-toastr';
import { UpdateProfileInfoModel, ProfileInfoModel } from 'src/app/shared/models/my-info';
import { takeUntil, finalize } from 'rxjs/operators';
import { FormTouch } from 'src/app/shared/helpers/form-touch';
import { FileHelper } from 'src/app/shared/helpers';
import { MatDialog } from '@angular/material';
import { TelInputDirective } from 'src/app/shared/directives/tell-input.directive';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit, OnDestroy {
  private _onDestroy = new Subject<void>();
  private _account: ProfileInfoModel;
  private _isAccountEditing: MyInfoEditing;
  @ViewChildren(TelInputDirective) telInput: QueryList<TelInputDirective>;

  @Input() set isAccountEditing(value: MyInfoEditing) {
    this._isAccountEditing = value;
  };

  @Input() set profileInfoModel(value: ProfileInfoModel) {
    if (!value) {
      return;
    }
    this._account = value;
    this.initFormData();
  };

  get profileInfoModel() {
    return this._account;
  };

  get isEditing() {
    return this._isAccountEditing === MyInfoEditing.Account;
  }

  get formControls() {
    return this.accountForm.controls;
  }

  public maxDate: Date;
  public profileModel: ProfileInfoModel = new ProfileInfoModel();
  public accountForm: FormGroup;
  public avatarUrl: string = "";
  public isPhotoUpdate: boolean = false;
  public isShowInfo: boolean = false;
  public isNumberValid: boolean = false;
  public pattern = validationPatterns().basicInformation;
  public notificationComponentIdEnum = NotificationComponentIdEnum;

  constructor(
    public dialog: MatDialog,
    private fileHelper: FileHelper,
    private readonly toast: ToastrService,
    private readonly cdr: ChangeDetectorRef,
    private readonly profileService: ProfileService,
    private readonly imageUploadService: ImageUploadService,
    private readonly loaderBtnStateService: LoaderBtnStateService,
    private readonly authenticationService: AuthenticationService,
    private readonly notificationHubHandlerService: NotificationHubHandlerService) {
    this.initializeForm();
  }

  ngOnInit() {
    const minYearsRestriction = 18;
    this.maxDate = new Date();
    this.maxDate.setFullYear(new Date().getFullYear() - minYearsRestriction);
  }

  public editAccount(event: Event): void {
    if (this.isAccountEditing === MyInfoEditing.Account) {
      event.stopPropagation();
    }
    this.isAccountEditing = MyInfoEditing.Account;
    this.initFormData();
  }

  public editCancel(event: Event): void {
    if (this.isAccountEditing === MyInfoEditing.Account) {
      event.stopPropagation();
    }
    this.isAccountEditing = MyInfoEditing.Nothing;
  }

  public updateAccountInfo(): void {
    if (this.accountForm.invalid) {
      FormTouch.markFormGroupTouched(this.accountForm);
      return;
    }

    let updateProfile: UpdateProfileInfoModel = new UpdateProfileInfoModel();
    updateProfile.firstName = this.accountForm.controls.firstName.value;
    updateProfile.lastName = this.accountForm.controls.lastName.value;
    updateProfile.birthday = this.accountForm.controls.birthday.value;
    updateProfile.profilePhoto = this.profileModel.profilePhoto;
    updateProfile.phoneNumber = this.telInput.first.getPhoneNumber();

    this.loaderBtnStateService.showLoader();
    this.profileService.updateAccountProfile(updateProfile).pipe(takeUntil(this._onDestroy),
      finalize(() => this.loaderBtnStateService.hideLoader())).subscribe(() => {
        this.toast.success("Your account info was updated!");
        this.updateLocalModel();
        this.isPhotoUpdate = false;
        this._isAccountEditing = MyInfoEditing.Nothing;
        this.cdr.detectChanges();
      });
  }

  public async changeProfileAvatar(event: any): Promise<void> {
    const file = event.target.files[0];
    if (this.fileHelper.getFileSize(file) >= 5120) {
      this.toast.warning("Max file size 5 Mb", "File size exceeded!");
      return;
    }
    const allowExtensions: Array<string> = ["png", "jpeg", "jpg"];
    const currentFileExtension: string = this.fileHelper.getFileExtension(
      file.name
    );
    if (!allowExtensions.includes(currentFileExtension)) {
      this.toast.warning("Use the file format as PNG, JPG, JPEG", "Unsupported file format!");
      return;
    }
    this.profileModel.profilePhoto = await this.imageUploadService.getImageBase64StringWithCanvas(file);
    this.profileInfoModel.profilePhoto = this.profileModel.profilePhoto;
    this.profileService.updateProfilePhoto(this.profileModel.profilePhoto.replace(/^data:image\/(\w+);base64,/, "")).pipe(takeUntil(this._onDestroy))
      .subscribe((res) => {
        this.toast.success("Your image was uploaded!");
        this.authenticationService.changeUserPhoto(res);
      });
    this.isPhotoUpdate = true;
    this.cdr.detectChanges();
  }

  private initFormData(): void {
    this.formControls.firstName.setValue(this.profileInfoModel.firstName);
    this.formControls.lastName.setValue(this.profileInfoModel.lastName);
    this.formControls.email.setValue(this.profileInfoModel.email);
    this.formControls.birthday.setValue(this.profileInfoModel.birthday);
    this.formControls.phoneNumber.setValue(this.profileInfoModel.phoneNumber);
    this.initSetPhoneNumber();
  }

  private initializeForm(): void {
    this.accountForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.pattern(this.pattern.firstName)
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.pattern(this.pattern.lastName)
      ]),
      email: new FormControl({ value: "", disabled: true }),
      phoneNumber: new FormControl(""),
      birthday: new FormControl("", [Validators.required])
    });
  }

  private updateLocalModel() {
    this._account.firstName = this.accountForm.controls.firstName.value;
    this._account.lastName = this.accountForm.controls.lastName.value;
    this._account.birthday = this.accountForm.controls.birthday.value;
    this._account.profilePhoto = this.profileModel.profilePhoto;
    this._account.phoneNumber = this.telInput.first.getPhoneNumber();
  }

  private initSetPhoneNumber(): void {
    if (!this.telInput || !this.telInput.first) {
      return;
    }
    this.telInput.first.setPhoneNumber(this._account.phoneNumber ? this._account.phoneNumber : "");
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
