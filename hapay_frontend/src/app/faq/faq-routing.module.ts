import { Routes, RouterModule } from "@angular/router";
import { FAQComponent } from './faq.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: "",
        component: FAQComponent,
        data: { title: "FAQ | AstroNet" }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FAQRoutingModule {}