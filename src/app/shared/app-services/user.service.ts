import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private userUrl = 'https://api.opticity.com.ua/api/users';

  public createUser(user) {
    return this.http.post<User>(this.userUrl + '/addUser', user);
  }

  public getUser(user) {
    return this.http.get<User>(this.userUrl + '/' + user.id);
  }

  public getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  public deleteUser(user) {
    return this.http.delete(this.userUrl + '/' + user.id);
  }
}
