import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule } from "ngx-spinner";

const SHARED_COMPONENTS = [
    FormsModule,
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    ReactiveFormsModule
];

@NgModule({
    imports: [
        ...SHARED_COMPONENTS
    ],
    exports: [
        ...SHARED_COMPONENTS
    ],
    declarations: [
    ],
})
export class SharedModule { }
