import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

const header = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private userUrl = '/api/users';

  // public createProduct(product, progressAddedImages) {
  //   return this.http.post<Product>(this.productUrl + '/addProduct', product, progressAddedImages);
  // }
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
