import { Injectable, EventEmitter } from '@angular/core';
import { AppResolitionService } from 'src/app/services/app-resolution.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationComponentIdEnum, NotificationSeverityEnum, NotificationStateEnum } from 'src/app/shared/enums';
import { HubNotificationViewModel } from 'src/app/shared/models/notification-hub';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: "root"
})
export class NotificationHubHandlerService {
    private notifications: Array<HubNotificationViewModel> = new Array<HubNotificationViewModel>();
    public notificationReceived: EventEmitter<HubNotificationViewModel> = new EventEmitter<HubNotificationViewModel>();
    public notificationRemoved: EventEmitter<void> = new EventEmitter<void>();
    public isMobileResolution: boolean;

    constructor(
        private readonly toastService: ToastrService,
        private readonly appResolitionService: AppResolitionService) {
        this.appResolitionService.screenSizeChangedToMobile.subscribe((value) => this.isMobileResolution = value);
    }

    public handleResponse(responce: HttpResponse<any>): void {
        const headers = responce.headers;
        const type = headers.get('x-notification-type');
        const title = headers.get('x-notification-title');
        const description = headers.get('x-notification-description');
        const icon = headers.get('x-notification-icon');
        const placeId = NotificationComponentIdEnum[(headers.get('x-notification-place-id'))];
        const state = NotificationStateEnum[(headers.get('x-notification-state'))];

        if (type && description) {
            let notificationModel = new HubNotificationViewModel();
            notificationModel.title = title;
            notificationModel.description = description;
            notificationModel.severity = NotificationSeverityEnum[type];
            notificationModel.icon = icon;
            notificationModel.placeId = placeId;
            notificationModel.state = state;
            if (notificationModel.state === NotificationStateEnum.Dynamic) {
                this.toastService.show(
                    notificationModel.description,
                    notificationModel.title,
                    null,
                    `toast-${(NotificationSeverityEnum[notificationModel.severity]).toLowerCase()}`
                );
                return;
            }
            this.addNotification(notificationModel);
            this.notificationReceived.emit(notificationModel);
        }
    }

    public addNotification(notification: HubNotificationViewModel): void {
        let existsNotification = this.notifications.find(x => x.placeId === notification.placeId);
        if (existsNotification) {
            existsNotification = notification;
            return;
        }
        this.notifications.push(notification);
    }

    public getNotificationById(placeId: NotificationComponentIdEnum): HubNotificationViewModel {
        const notification = this.notifications.find(x => x.placeId === placeId);
        return notification;
    }

    public removeNotificationById(placeId: NotificationComponentIdEnum) {
        this.notifications = this.notifications.filter(it => it.placeId !== placeId);
        this.notificationRemoved.emit()
    }
}