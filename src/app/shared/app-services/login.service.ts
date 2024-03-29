import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl = 'https://api.opticity.com.ua/api/login';

  constructor(private http: HttpClient) {
  }

  public login(parameters?: string) {
    return this.http.post(this.loginUrl, parameters, {observe: 'response'});
  }
}
