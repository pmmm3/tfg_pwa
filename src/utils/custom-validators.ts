import {AbstractControl, ValidatorFn} from "@angular/forms";

export function ConfirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return {'mismatchedPasswords': true};
    }
    return null;
  };
}
