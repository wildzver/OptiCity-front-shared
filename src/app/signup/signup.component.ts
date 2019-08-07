import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, NgModel, ValidationErrors, Validators} from '@angular/forms';
import {CustomValidators} from './custom-validators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';

// export class User {
//   constructor(
//     public firstName?: string,
//     public lastName?: string,
//     public email?: string,
//     public phone?: string,
//     public password?: string,
//     public checkPassword?: string,
//     public source?: string) {
//   }
// }

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  styles: [`
    input.ng-touched.ng-invalid, select.ng-touched.ng-pristine {
      border: solid red 1px;
      /*border-left: solid red 6px;*/
    }
  `],
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  submitted = false;

  signupForm: FormGroup;

  sources: string[] = ['OLX', 'Instagram', 'Друзі, знайомі', 'Інші джерела'];


  ngOnInit() {
    this.initSignupForm();
  }

  private initSignupForm() {
    this.signupForm = this.fb.group({
        userFirstName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-zА-Яа-яІіЇїЄє\'-.\\s]+$')
        ]),
        userLastName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-zА-Яа-яІіЇїЄє\'-.\\s]+$')]),
        userEmail: new FormControl('', [Validators.required,
          Validators.email
          // Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}')
        ]),
        userPhones: new FormArray([new FormControl('', [
          Validators.required,
          Validators.pattern('((?:\\+|00)[17](?: |\\-)?|(?:\\+|00)[1-9]\\d{0,2}(?: |\\-)?|(?:\\+|00)1\\-\\d{3}(?: |\\-)?)?(0\\d|\\([0-9]{3}\\)|[1-9]{0,3})(?:((?: |\\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: ?|\\-?)[0-9]{3}(?: ?|\\-?)[0-9]{7})|([0-9]{7}))')])]),
        userPassword: new FormControl('', [
          Validators.required,
          CustomValidators.patternValidator(/\d/, {hasDigit: true}),
          CustomValidators.patternValidator(/[A-Z]/, {hasCapitalLetter: true}),
          CustomValidators.patternValidator(/[a-z]/, {hasLowercaseLetter: true}),
          Validators.minLength(8)
          // this.userPasswordValidator
          // Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
        ]),
        userCheckPassword: new FormControl('', [
          Validators.required
        ]),
        userSource: new FormControl('', Validators.required)
      },
      {
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  isControlRequired(controlName: string): boolean {
    const control = this.signupForm.controls[controlName];

    const result = control.touched && control.hasError('required');

    return result;
  }

  isControlPatterned(controlName: string): boolean {
    const control = this.signupForm.controls[controlName];

    const result = control.dirty && control.hasError('pattern');

    return result;
  }

  isControlEmpty(controlName: string): boolean {
    const control = this.signupForm.controls[controlName];

    const result = control.value === '';

    return result;
  }

  // userNameValidator(control: FormControl): { [s: string]: boolean } {
  //
  //   if (control.value === 'нет') {
  //     return {userCheckPassword: true};
  //   }
  //   return null;
  // }

  checker(controlName: string): string {
    if (this.signupForm.controls[controlName].valid) {
      return 'is-valid';
    }
    if (this.signupForm.controls[controlName].touched && this.signupForm.controls[controlName].invalid) {
      return 'is-invalid';
    } else {
      return 'is-default';
    }
  }

  // private userPasswordValidator(control: FormControl): ValidationErrors {
  //   const value = control.value;
  //
  //   const hasDigit = /[0-9]/.test(value);
  //
  //   const hasCapitalLetter = /[A-Z]/.test(value);
  //
  //   const hasLowercaseLetter = /[a-z]/.test(value);
  //
  //   const isLengthValid = value ? value.length > 7 : false;
  //
  //   const passwordValid = hasDigit && hasCapitalLetter && hasLowercaseLetter && isLengthValid;
  //
  //   if (!hasDigit) {
  //     return [{noDigit: 'принаймні одну цифру'}, {noCapitalLetter: 'принаймні 1 велику літеру латинського алфавіту'}, {noLowercaseLetter: 'принаймні 1 малу літеру латинського алфавіту'}];
  //   }
  //
  //   if (!hasCapitalLetter) {
  //     return {noCapitalLetter: 'принаймні 1 велику літеру латинського алфавіту'};
  //   }
  //
  //   if (!hasLowercaseLetter) {
  //     return {noLowercaseLetter: 'принаймні 1 малу літеру латинського алфавіту'};
  //   }
  //   if (!passwordValid) {
  //     return { invalidPassword: 'Пароль не прошел валидацию' };
  //   }
  //   return null;
  // }

  // user: User = new User('', '', '', '', '', '', '');
  //
  //
  // onChange() {
  //   for (const userElement in this.user) {
  //     if (this.user[userElement] === '  ') {
  //       // this.user[userElement] = this.v.replace(/  +/g, ' ');
  //     } else {
  //       continue;
  //     }
  //   }
  // }

  // addUser(firstName: NgModel,
  //         lastName?: NgModel,
  //         userEmail?: NgModel,
  //         userPhone?: NgModel,
  //         password?: NgModel,
  //         source?: NgModel) {
  //   console.log(firstName);
  //   console.log(lastName);
  //   console.log(userEmail);
  //   console.log(userPhone);
  //   console.log(password);
  //   console.log(source);
  // }

  // addPhone(): void {
  //   (this.signupForm.controls.userPhones as FormArray).push(new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('((?:\\+|00)[17](?: |\\-)?|(?:\\+|00)[1-9]\\d{0,2}(?: |\\-)?|(?:\\+|00)1\\-\\d{3}(?: |\\-)?)?(0\\d|\\([0-9]{3}\\)|[1-9]{0,3})(?:((?: |\\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: ?|\\-?)[0-9]{3}(?: ?|\\-?)[0-9]{7})|([0-9]{7}))')
  //   ]));
  // }
  //
  // removePhone(i: number): void {
  //   (this.signupForm.get('userPhones') as FormArray).removeAt(i);
  // }

  addUser() {
    const user: User = {
      firstName: this.signupForm.controls.userFirstName.value,
      lastName: this.signupForm.controls.userLastName.value,
      email: this.signupForm.controls.userEmail.value,
      phone: this.signupForm.controls.userPhones.value[0],
      password: this.signupForm.controls.userPassword.value,
      source: this.signupForm.controls.userSource.value
    };

    console.log(JSON.stringify(user));
    this.submitted = true;
    this.userService.createUser(user).subscribe((value) => {
      console.log(value),
        alert('Ви успішно зареєстровані!');
    });
  }
}

