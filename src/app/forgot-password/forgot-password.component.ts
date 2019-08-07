import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../signup/custom-validators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  forgotPasswordForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.forgotPasswordForm = this.fb.group({
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email]),
    });
  }

  checker(controlName: string): string {
    if (this.forgotPasswordForm.controls[controlName].valid) {
      return 'is-valid';
    }
    if (this.forgotPasswordForm.controls[controlName].touched && this.forgotPasswordForm.controls[controlName].invalid) {
      return 'is-invalid';
    } else {
      return 'is-default';
    }
  }

  isControlRequired(controlName: string): boolean {
    const control = this.forgotPasswordForm.controls[controlName];

    const result = control.touched && control.hasError('required');

    return result;
  }

  isControlEmpty(controlName: string): boolean {
    const control = this.forgotPasswordForm.controls[controlName];

    const result = control.value === '';

    return result;
  }

  sendEmail() {
  }

}
