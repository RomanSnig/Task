import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(u) {
    return this.http.post('http://localhost:3000/user/login', {email: u.email, password: u.password});
  }
  createUser(u: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/user/register', u);
  }
}
