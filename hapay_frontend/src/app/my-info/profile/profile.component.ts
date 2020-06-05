import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AppResolitionService } from 'src/app/services/app-resolution.service';
import { MyInfoOpened, MyInfoEditing } from 'src/app/shared/enums';
import { ProfileService, AuthenticationService } from 'src/app/services';
import { ProfileInfoModel } from 'src/app/shared/models/my-info';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy {
  private _onDestroy = new Subject<void>();

  public step: number = 1;
  public isMobileTabActive: boolean = false;
  public isSmallTabletResolution: boolean = false;
  public profileInfoModel: ProfileInfoModel;

  public isOpened: MyInfoOpened;
  public isEditing: MyInfoEditing = MyInfoEditing.Nothing;
  public readonly isAccountEditMode: MyInfoEditing = MyInfoEditing.Account;
  public readonly isPasswordEditMode: MyInfoEditing = MyInfoEditing.Password;
  public gettingDataInProgress: boolean;

  get isAccountOpened(): boolean {
    return this.isOpened === MyInfoOpened.Account;
  }

  get isPasswordOpened() {
    return this.isOpened === MyInfoOpened.Password;
  }

  constructor(
    private readonly spinnerService: NgxSpinnerService,
    private readonly profileService: ProfileService,
    private readonly appResolitionService: AppResolitionService,
    private readonly authenticationService: AuthenticationService) {
    this.appResolitionService.getIsScreenMobile().subscribe((val) => {
      this.isSmallTabletResolution = val;
    })
  }

  public openAccount(): void {
    if (this.isOpened !== MyInfoOpened.Account) {
      this.isOpened = MyInfoOpened.Account;
      return;
    }
    this.isOpened = MyInfoOpened.Nothing;
  }

  public editAccount(event: Event): void {
    if (this.isOpened === MyInfoOpened.Account && event) {
      event.stopPropagation();
    }
    this.isEditing = MyInfoEditing.Account;
  }

  ngOnInit() {
    this.getAccountInfo();
  }

  public showComponent(stepNumber: number): void {
    this.step = stepNumber;
    this.showMobileNavList();
  }

  public showMobileNavList(): void {
    this.isMobileTabActive = !this.isMobileTabActive;
  }

  public openPassword(): void {
    if (this.isOpened !== MyInfoOpened.Password) {
      this.isOpened = MyInfoOpened.Password;
      return;
    }
    this.isOpened = MyInfoOpened.Nothing;
  }

  public updateAccountInfo() {

  }

  public logOut() {
    this.authenticationService.logout();
  }

  public editPassword(event: Event): void {
    if (this.isOpened === MyInfoOpened.Password && event) {
      event.stopPropagation();
    }
    this.isEditing = MyInfoEditing.Password;
  }

  public openBilling(): void {
    if (this.isOpened !== MyInfoOpened.Billing) {
      this.isOpened = MyInfoOpened.Billing;
      return;
    }
    this.isOpened = MyInfoOpened.Nothing;
  }

  private getAccountInfo(): void {
    this.spinnerService.show();
    this.profileService.getAccountProfile().pipe(takeUntil(this._onDestroy),
      finalize(() => this.spinnerService.hide())).subscribe((res: ProfileInfoModel) => {
        this.profileInfoModel = res;
      });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
