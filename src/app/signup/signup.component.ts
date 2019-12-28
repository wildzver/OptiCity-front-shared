import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../shared/custom-validators';
import {User} from '../shared/models/user';
import {UserService} from '../shared/app-services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  styles: [`
    input.ng-touched.ng-invalid, select.ng-touched.ng-pristine {
      border: solid red 1px;
    }
  `],
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private userService: UserService) {
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

  addUser() {
    const user: User = {
      firstName: this.signupForm.controls.userFirstName.value,
      lastName: this.signupForm.controls.userLastName.value,
      email: this.signupForm.controls.userEmail.value,
      phone: this.signupForm.controls.userPhones.value[0],
      password: this.signupForm.controls.userPassword.value,
      source: this.signupForm.controls.userSource.value
    };

    this.submitted = true;
    this.userService.createUser(user).subscribe((value) => {
        alert('Ви успішно зареєстровані!');
    });
  }

  get signupFormUserPhones() {
    return this.signupForm.get('userPhones') as FormArray;
  }
}
