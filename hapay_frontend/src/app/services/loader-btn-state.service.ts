import {
    Injectable,
    Renderer2,
    ElementRef,
    RendererFactory2
} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoaderBtnStateService {
    private _currentElem: ElementRef;
    public renderer: Renderer2;

    constructor(private rendererFactory: RendererFactory2) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    get currentElement(): ElementRef<any> {
        return this._currentElem;
    }

    set currentElement(currentElem: ElementRef) {
        if (currentElem) {
            this._currentElem = currentElem;
        }
    }

    public setActiveAstroNetButton(button: HTMLElement): void {
        let cazamioButtonChildrens = button.children;
        Array.from(cazamioButtonChildrens).forEach((element) => {
            let atr = element.attributes.getNamedItem("loaderbtn")
            if (element.nodeName === "BUTTON" && atr != null) {
                this.currentElement = new ElementRef(element);
            }
        });
    }

    public showLoader(isNeedDisabling: boolean = true): void {
        console.log('dsd');
        if (this.currentElement) {
            this.currentElement.nativeElement.disabled = isNeedDisabling;
            this.renderer.addClass(this.currentElement.nativeElement, "button-loader");
        }
    }

    public hideLoader(): void {
        if (this.currentElement) {
            this.currentElement.nativeElement.disabled = false;
            this.renderer.removeClass(this.currentElement.nativeElement, "button-loader");
        }
    }
}
