import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (
            matchingControl.errors &&
            !matchingControl.errors['confirmPasswordValidator'] // Accessing using square brackets
        ) {
            return null; // Return early if another validator has already found an error
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ 'confirmPasswordValidator': true }); // Accessing using square brackets
        } else {
            matchingControl.setErrors(null);
        }

        return null;
    };
}
