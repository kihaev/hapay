export class ProfileInfoModel {
    email: string | null;
    firstName: string | null;
    id: string;
    lastName: string | null;
    phoneNumber: string | null;
    profilePhoto: string;
    birthday: string;
}

export class UpdateProfileInfoModel {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthday: string;
    profilePhoto?: string;
}