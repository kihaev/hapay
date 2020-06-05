import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyLoggedInUsersGuard } from 'src/app/core/guards';


const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
  },
  {
    path: 'upload-file',
    loadChildren: () => import('./upload-file/upload-file.module').then(module => module.UploadFileModule)
  },
  {
    path: 'show-my-files',
    loadChildren: () => import('./show-my-files/show-my-files.module').then(module => module.ShowMyFilesModule)
  },
  // {
  //   path: 'my-info',
  //   canActivate: [OnlyLoggedInUsersGuard],
  //   loadChildren: () => import('./my-info/my-info.module').then(module => module.MyInfoModule)
  // },
  // {
  //   path: 'contact-us',
  //   loadChildren: () => import('./contact-us/contact-us.module').then(module => module.ContactUsModule),
  // },
  // {
  //   path: 'faq',
  //   loadChildren: () => import('./faq/faq.module').then(module => module.FAQModule),
  // },
  // {
  //   path: 'about-us',
  //   loadChildren: () => import('./about-us/about-us.module').then(module => module.AboutUsModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
