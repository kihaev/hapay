import { NotificationComponentIdEnum, NotificationSeverityEnum, NotificationStateEnum } from 'src/app/shared/enums';

export class HubNotificationViewModel {
    title: string;
    description: string
    icon: string
    severity: NotificationSeverityEnum;
    placeId: NotificationComponentIdEnum;
    state: NotificationStateEnum;
}