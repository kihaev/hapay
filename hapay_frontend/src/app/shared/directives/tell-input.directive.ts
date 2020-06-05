import { isPlatformBrowser } from '@angular/common';
import { parsePhoneNumberFromString, PhoneNumber, AsYouType } from 'libphonenumber-js';
import { Directive, Input, OnInit, Output, EventEmitter, ElementRef, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const window: any;

@Directive({
    selector: '[TelInput]'
})
export class TelInputDirective implements OnInit {
    @Input('telInputOptions') telInputOptions: any = { initialCountry: 'US', separateDialCode: true };
    @Input('telInputIsRequired') telInputIsRequired: boolean = true;
    @Output('telInputValidStatus') telInputValidStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output('telInputNewNumber') telInputNewNumber: EventEmitter<string> = new EventEmitter();

    ngTelInput: any;

    private currentCountryCode: string;
    private availableCountPhoneDigitals: number;
    private readonly defaultCountry: string = "US";
    private onDestroy = new Subject<void>();

    constructor(
        private el: ElementRef,
        @Inject(PLATFORM_ID) private platformId: string
    ) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.ngTelInput = window.intlTelInput(this.el.nativeElement, this.telInputOptions);
            this.el.nativeElement.addEventListener("countrychange", () => {
                setTimeout(() => {
                    this.reInitVariablesRelatedWithPhoneNumber();
                    this.el.nativeElement.dispatchEvent(new Event('input'));
                    this.emitEvents();
                }, 0);
            });
        }
    }

    @HostListener('input', ['$event']) onInput(event) {
        const currentValue: string = this.el.nativeElement.value;
        const updatedValue: string = currentValue.replace(/[^0-9]*/g, '').substring(0, this.availableCountPhoneDigitals ? this.availableCountPhoneDigitals : 9);
        this.el.nativeElement.value = updatedValue;

        this.emitEvents();

        if (currentValue !== updatedValue) {
            event.stopPropagation();
            return;
        }
    }

    public setPhoneNumber(phoneNumber: string): void {
        if (isPlatformBrowser(this.platformId)) {
            try {
                const phoneNumberDetail: PhoneNumber = parsePhoneNumberFromString(phoneNumber);
                this.setCountry(phoneNumberDetail.country);
                this.currentCountryCode = `+${phoneNumberDetail.countryCallingCode}`;
                const onlyDigitalsPhoneNumber: string = this.el.nativeElement.placeholder.replace(/[^0-9]/g, '');
                this.el.nativeElement.value = phoneNumberDetail.nationalNumber;
                this.availableCountPhoneDigitals = onlyDigitalsPhoneNumber.length;
                this.emitEvents();
            } catch (error) {
                this.el.nativeElement.value = '';
            }
        }
    }

    private emitEvents(): void {
        try {
            const currentPhoneNumber = this.getPhoneNumber();

            if (!this.currentInputValue && !this.telInputIsRequired) {
                this.telInputNewNumber.emit(null);
                this.telInputValidStatus.emit(true);
                return;
            }

            //const currentPhoneNumberDetail = parsePhoneNumberFromString(currentPhoneNumber);
            //const isValidMobilePhone = currentPhoneNumberDetail && currentPhoneNumberDetail.isValid();

            this.telInputValidStatus.emit(this.ngTelInput.isValidNumber());

            if (this.ngTelInput.isValidNumber() || !this.telInputIsRequired) {
                this.telInputNewNumber.emit(currentPhoneNumber);
                return;
            }
        } catch (error) {
            this.telInputValidStatus.emit(false);
        }
    }

    private get currentInputValue(): string {
        return this.el.nativeElement.value;
    }

    private reInitVariablesRelatedWithPhoneNumber(): void {
        const countryData = this.ngTelInput.getSelectedCountryData();
        const countryCode = `+${countryData.dialCode}`;
        this.el.nativeElement.countryCode = countryCode;
        this.currentCountryCode = countryCode;
        const onlyDigitalsPhoneNumber: string = this.el.nativeElement.placeholder.replace(/[^0-9]/g, '');
        this.availableCountPhoneDigitals = onlyDigitalsPhoneNumber.length;
    }

    public getPhoneNumber(): string | null {
        if (!this.telInputIsRequired && !this.currentInputValue) {
            return null;
        }

        const phoneNumber: string = this.ngTelInput.getNumber();
        return phoneNumber;
    }

    private setCountry(country: string): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.ngTelInput) {
                this.ngTelInput.setCountry(country ? country : this.defaultCountry);
                this.reInitVariablesRelatedWithPhoneNumber();
            }
        }
    }
}
