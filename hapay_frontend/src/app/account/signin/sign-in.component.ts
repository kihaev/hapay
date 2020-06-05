import { Component, OnInit } from '@angular/core';
import { validationPatterns } from 'src/app/shared/helpers/validationPatterns';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseAuthComponent } from '../base-auth/base-auth.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthService } from 'angularx-social-login';
import { CookieWrapperService } from 'src/app/services/cookie-wrapper.service';
import { ToastrService } from 'ngx-toastr';

const SHARED_PATTERNS = validationPatterns().sharedPatterns;

@Component({
    selector: 'app-signin',
    templateUrl: 'sign-in.component.html',
    styleUrls: ['sign-in.component.scss']
})

export class SignInComponent extends BaseAuthComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(public router: Router,
        public toastr: ToastrService,
        public authService: AuthService,
        public authenticationService: AuthenticationService,
        public cookieWrapperService: CookieWrapperService) {
        super(router, toastr, authService, cookieWrapperService, authenticationService);
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl("", [
                Validators.required,
                Validators.pattern(SHARED_PATTERNS.emailAddress)
            ]),
            password: new FormControl("", [Validators.required])
        });
    }


    public login(): void {
        if (this.loginForm.invalid) {
            if (this.loginForm.controls.email.invalid) {
                this.loginForm.controls.email.markAsDirty();
            }
            if (this.loginForm.controls.password.invalid) {
                this.loginForm.controls.password.markAsDirty();
            }
            return;
        }
        this.authenticationService.login(
            {user: 
                {   email: this.loginForm.controls.email.value, 
                    password: this.loginForm.controls.password.value
                }}
            ).subscribe();
        // this.authenticate(this, this.loginCallback);
    }

    public forgotPassword() {
        this.router.navigate(['/']);
    }

    public signup(): void {
        this.router.navigate(['/account/signup']);
    }
}