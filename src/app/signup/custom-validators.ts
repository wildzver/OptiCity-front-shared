import {AbstractControl, AsyncValidator, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static sizeValidator(minlength: number, maxlength: number, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const invalid = (control.value.toString().length < minlength || control.value.toString().length > maxlength);
      return invalid ? error : null;
    };
  }

  // static sizeValid(minlength: number, maxlength: number, error: ValidationErrors): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
  //     if (!control.value) {
  //       return null;
  //     }
  //     const invalid = (control.value.toString().length < minlength || control.value.toString().length > maxlength);
  //     return invalid ? error : null;
  //   }
  // }

  static intSrartsAtZeroValidator(error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const invalid = control.value.toString().length > 1 && control.value.toString().startsWith('0');
      return invalid ? error : null;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('userPassword').value; // get password from our password form control
    const confirmPassword: string = control.get('userCheckPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('userCheckPassword').setErrors({noPassswordMatch: true});
    }
  }


}
