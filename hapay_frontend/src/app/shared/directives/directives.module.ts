import { NgModule } from "@angular/core";
import { LoaderBtnDirective } from "./loader-btn.directive";
import { TelInputDirective } from 'src/app/shared/directives/tell-input.directive';

const DIRECTIVES = [
    LoaderBtnDirective,
    TelInputDirective
];

@NgModule({
    exports: [
        ...DIRECTIVES,
    ],
    declarations: [
        ...DIRECTIVES,
    ]
})
export class DirectivesModule { }