import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user.model';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storage: CookieService) { }

  registerUser(user: User) {
    const body = { login: user.login, password: user.password, email: user.email, phone: user.phone, role: user.role, image: user.image };
    return this.http.post('http://localhost:5116/Auth/Register', body);
  }
  loginUser(user: User) {
    const body = { login: user.login, password: user.password };
    return this.http.post('http://localhost:5116/Auth/Login', body);
  }
 /* getUserByToken(token: string){
    return this.http.get(`http://localhost:5116/Auth/${token}`)
  }*/
  getUserById(){
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token')}`);
    return this.http.get(`http://localhost:5116/User`, {headers})
  }
}
