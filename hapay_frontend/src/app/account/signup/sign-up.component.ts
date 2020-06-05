import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, } from '@angular/core';
import { validationPatterns } from 'src/app/shared/helpers/validationPatterns';
import { PasswordValidator } from 'src/app/shared/validators/password-validator';
import { FormTouch } from 'src/app/shared/helpers/form-touch';
import { RegistrationService } from 'src/app/services/registration.service';
import { BaseAuthComponent } from '../base-auth/base-auth.component';
import { CookieWrapperService } from 'src/app/services/cookie-wrapper.service';
import { AuthService } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SignupAccountViewModel } from 'src/app/shared/models/account/signup-account.view.model';
import { ToastrService } from 'ngx-toastr';

const SHARED_PATTERNS = validationPatterns().sharedPatterns;

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends BaseAuthComponent implements OnInit {
  public registerForm: FormGroup;
  public requesting: boolean = false;
  get formControls() { return this.registerForm.controls; }

  constructor(private readonly formBuilder: FormBuilder,
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public authenticationService: AuthenticationService,
    public cookieWrapperService: CookieWrapperService,
    private readonly registrationService: RegistrationService) {
    super(router, toastr, authService, cookieWrapperService, authenticationService);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(SHARED_PATTERNS.emailAddress)])],
      password: ['', [Validators.required, PasswordValidator.strong]],
      confirmPassword: ["", [Validators.required, PasswordValidator.checkPassword]]
    });
  }

  public onSubmit() {
    // this.registrationService.kek().subscribe(data => console.log(data), (error) => console.log(error));
    
    if (this.registerForm.invalid) {
      FormTouch.markFormGroupTouched(this.registerForm);
      return;
    }
    // const model = this.registerForm.value as SignupAccountViewModel;
    const model = {
      username: this.registerForm.controls['firstName'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value
    }
    this.registrationService.register({user: model}).pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.router.navigate(["/"]);
    }, (error) => {
    });
  }
}
