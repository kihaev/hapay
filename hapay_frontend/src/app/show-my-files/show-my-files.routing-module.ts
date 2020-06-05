import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowMyFilesComponent } from './show-my-files.component';

const routes: Routes = [
  {
    path: "",
    component: ShowMyFilesComponent,
    data: { title: "Show my files | Hapay" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowMyFilesRoutingModule {}
