import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClassField} from '@angular/compiler';
import {Style} from '@angular/cli/lib/config/schema';
import {CustomValidators} from '../signup/custom-validators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// export class UserLogin {
//   constructor(
//     public userEmail: string,
//     public userPassword: string) {
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // styles: [`
  //   input.ng-touched.ng-invalid, select.ng-touched.ng-pristine {
  //     border: solid red 1px;
  //   }
  // `],
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  loginForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email]),
      userPassword: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/\d/, {hasDigit: true}),
        CustomValidators.patternValidator(/[A-Z]/, {hasCapitalLetter: true}),
        CustomValidators.patternValidator(/[a-z]/, {hasLowercaseLetter: true}),
        Validators.minLength(8)])
    });
  }

  checker(controlName: string): string {
    if (this.loginForm.controls[controlName].valid) {
      return 'is-valid';
    }
    if (this.loginForm.controls[controlName].touched && this.loginForm.controls[controlName].invalid) {
      return 'is-invalid';
    } else {
      return 'is-default';
    }
  }

  isControlRequired(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];

    const result = control.touched && control.hasError('required');

    return result;
  }

  isControlEmpty(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];

    const result = control.value === '';

    return result;
  }

  login() {
    console.log(this.loginForm.controls.userEmail.value);
    this.http.post('http://localhost:8080/login', JSON.stringify({
      username: this.loginForm.controls.userEmail.value,
      password: this.loginForm.controls.userPassword.value
    }), {observe: 'response'}).subscribe(value => {
      const token = value.headers.get('Authorization');
      console.log(token);
      console.log(value);

      localStorage.setItem('_token', token);
    });
  }

  getInfo() {
    const headersOption = new HttpHeaders({Authorization: localStorage.getItem('_token')});

    this.http.get('http://localhost:8080/get', {headers: headersOption, responseType: 'text'}).subscribe(data => console.log(data));
  }
}
