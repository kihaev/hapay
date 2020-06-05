import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UploadFileComponent } from './upload-file.component';

const routes: Routes = [
  {
    path: "",
    component: UploadFileComponent,
    data: { title: "Upload File | Hapay" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFileRoutingModule {}
