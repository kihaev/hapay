import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { MyInfoComponent } from "./my-info.component";
import { OnlyLoggedInUsersGuard } from 'src/app/core/guards';

const routes: Routes = [

    {
        path: "",
        canActivate: [OnlyLoggedInUsersGuard],
        component: MyInfoComponent,
        children: [
            { path: '', redirectTo: '/my-info/profile', pathMatch: 'full' },
            {
                path: "profile",
                component: ProfileComponent,
                data: { title: "Profile | Hapay" }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyInfoRoutingModule { }