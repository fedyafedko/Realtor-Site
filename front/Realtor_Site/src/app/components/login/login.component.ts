import { Component } from '@angular/core';
import {User} from "../request/models/user.model";
import {UserService} from "../request/services/user.service";
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  receivedUser: User | undefined;
  done: boolean = false;

  constructor(private userService: UserService, private storage: CookieService, private router: Router) {}

  login(user: User) {
    this.userService.loginUser(user)
      .subscribe({
        next: (data: any) => {
          this.receivedUser = data.token;
          this.done = true;
          console.log(`token: ${this.receivedUser}`);
          this.storage.set('token', `${this.receivedUser}`);

          this.router.navigate(['/'])
        },
        error: (error: any) => {
          console.log(user)
          alert("You entered an incorrect login or password");
          console.log(error);
        }
      });
  }
}
