import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountComponent } from './account.component';
import { SignInComponent } from './signin/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './signup/sign-up.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { OnlyLoggedOutUsersGuard } from '../core/guards';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    { path: "", redirectTo: "/account/signin", pathMatch: "full" },
    {
        path: "",
        component: AccountComponent,
        children: [
            {
                path: "signin",
                canActivate: [OnlyLoggedOutUsersGuard],
                component: SignInComponent,
                data: { title: "Sign In | MasonsTours" }
            },
            {
                path: "signup",
                canActivate: [OnlyLoggedOutUsersGuard],
                component: SignUpComponent,
                data: { title: "Sign Up| MasonsTours" }
            },
            {
                path: "email-confirm",
                canActivate: [OnlyLoggedOutUsersGuard],
                component: EmailConfirmComponent,
                data: { title: "Confirm email | MasonsTours" }
            },
            {
                path: "forgot-password",
                canActivate: [OnlyLoggedOutUsersGuard],
                component: ForgotPasswordComponent,
                data: { title: "Forgot Password | MasonsTours" }
            },
            {
                path: "reset-password",
                canActivate: [OnlyLoggedOutUsersGuard],
                component: ResetPasswordComponent,
                data: { title: "Password reset | MasonsTours" }
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
