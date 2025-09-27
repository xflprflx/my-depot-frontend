import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const minLength = value.length >= 8;

    console.log('Password validation:', { hasUpper, hasLower, hasNumber, hasSpecial, minLength });

    const valid = hasUpper && hasLower && hasNumber && hasSpecial && minLength;

    return valid ? null : { passwordStrength: true };
}
