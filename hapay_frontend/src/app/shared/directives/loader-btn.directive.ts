import { Directive, ElementRef, Renderer2, HostListener, OnInit } from "@angular/core";
import { LoaderBtnStateService } from 'src/app/services';

@Directive({
    selector: "[loaderBtn]"
})
export class LoaderBtnDirective implements OnInit {
    constructor(
        private element: ElementRef,
        private stateService: LoaderBtnStateService,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        const span: ElementRef = this.renderer.createElement("span");
        this.renderer.addClass(span, "loader-selector");
        this.renderer.appendChild(this.element.nativeElement, span);
    }

    @HostListener("click") onClick() {
        this.stateService.currentElement = this.element;
    }
}