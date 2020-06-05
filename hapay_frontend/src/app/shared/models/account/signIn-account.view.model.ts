export class SignInAccountViewModel {

    user: User
}
export class SignInAccountUserDataViewModel {
    public userId: string;
    public userName: string;
    public userEmail: string;
    public userRoleId: number;
    public userPhoto: string;
}

export class User {
    public email: string
    public token: string
    public username: string
}