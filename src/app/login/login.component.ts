import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from '../shared/app-services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private loginService: LoginService) {
  }

  loginForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      userEmail: new FormControl(''),
      userPassword: new FormControl('')
    });
  }

  private getLoginParams() {
    return {
      username: this.loginForm.controls.userEmail.value,
      password: this.loginForm.controls.userPassword.value
    };
  }

  login() {
    this.loginService.login(JSON.stringify(this.getLoginParams())).subscribe(value => {
      const token = value.headers.get('authorization');
      localStorage.setItem('_token', token);
    });
  }

  getInfo() {
    const headersOption = new HttpHeaders({Authorization: localStorage.getItem('_token')});

    this.http.get('http://opticityback-env.gw7hzrtssp.us-east-2.elasticbeanstalk.com/get', {headers: headersOption, responseType: 'text'}).subscribe(data => console.log(data));
  }
}
