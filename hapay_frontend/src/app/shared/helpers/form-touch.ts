import { FormArray, FormGroup } from '@angular/forms';

export class FormTouch {
    public static markFormArrayTouched(formArray: FormArray) {
        formArray.controls.forEach(formGroup => {
            this.markFormGroupTouched(formGroup as FormGroup);
        });
    }

    public static markFormGroupTouched(formGroup: FormGroup) {
        for (const key in formGroup.controls) {
            formGroup.controls[key].markAsTouched();
        }
    }
}
