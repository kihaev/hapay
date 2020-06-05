import { FormControl } from "@angular/forms";

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {
  public static strong(control: FormControl): ValidationResult {
    if (control.value) {
      const hasNumber = /\d/.test(control.value);
      const hasUpper = /[A-Z]/.test(control.value);
      const hasLower = /[a-z]/.test(control.value);
      const hasSymbol = /[^a-zA-Z0-9\-\/]/.test(control.value);
      const hasLength = control.value.length >= 8;
      const valid = hasNumber && hasUpper && hasLower && hasLength && hasSymbol;
      if (valid) {
        return null;
      }
      return {
        hasNumber: hasNumber,
        hasUpper: hasUpper,
        hasLower: hasLower,
        hasLength: hasLength,
        hasSymbol: hasSymbol
      };
    }
    return null;
  }

  public static checkPassword(control: FormControl): ValidationResult {
    if (
      control.parent === undefined ||
      control.parent.value.password === "" ||
      control.value === ""
    ) {
      return;
    }
    const password = control.parent.value.password;
    const confirmPassword = control.value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { matchPassword: true };
    }
  }
}