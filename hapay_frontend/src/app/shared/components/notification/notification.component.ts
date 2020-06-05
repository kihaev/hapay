import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotificationComponentIdEnum, NotificationSeverityEnum, NotificationStateEnum } from 'src/app/shared/enums';
import { HubNotificationViewModel } from 'src/app/shared/models/notification-hub';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { NotificationHubHandlerService } from 'src/app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private _model = new HubNotificationViewModel();
  private _onDestroy = new Subject<void>();

  @Input() placeId: NotificationComponentIdEnum;

  get model(): HubNotificationViewModel {
    return this._model;
  }
  set model(value: HubNotificationViewModel) {
    this._model = value;
  }
  public notificationSeverityEnum = NotificationSeverityEnum;
  public notificationComponentIdEnum = NotificationComponentIdEnum;
  public notificationStateEnum = NotificationStateEnum;
  public iconString: SafeUrl;

  constructor(private notificationHubHandler: NotificationHubHandlerService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.model = this.notificationHubHandler.getNotificationById(this.placeId);
    if (this.model) {
      this.handleModelIcon();
    }
    this.notificationHubHandler.notificationRemoved.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.model = this.notificationHubHandler.getNotificationById(this.placeId);
    });
    this.notificationHubHandler.notificationReceived.pipe(takeUntil(this._onDestroy)).subscribe((res: HubNotificationViewModel) => {
      if (this.placeId && this.placeId === res.placeId) {
        this.model = res;
        this.handleModelIcon();
        return;
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private handleModelIcon(): void {
    if (this.model.icon.indexOf(`data:image/svg+xml;base64`) < 0) {
      this.model.icon = `data:image/svg+xml;base64, ${this.model.icon}`;
    }
    this.iconString = this.sanitizer.bypassSecurityTrustUrl(this.model.icon);
  }
}
