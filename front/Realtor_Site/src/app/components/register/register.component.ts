import { Component } from '@angular/core';
import {User} from "../request/models/user.model";
import {UserService} from "../request/services/user.service";
import {Router} from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {
  imageSrc: string | ArrayBuffer | null = 'assets/Images/auth.png';
  hoverImageSrc: string | ArrayBuffer | null = 'assets/Images/camera.png';
  selectedFileName: string = '';

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.imageSrc = URL.createObjectURL(selectedFile);

      this.selectedFileName = selectedFile.name;
      console.log('Selected file name:', this.selectedFileName);
    }
  }

  user: User = new User();
  receivedUser: User | undefined;
  done: boolean = false;

  constructor(private userService: UserService, private storage: CookieService, private router: Router) {
  }

  register(user: User) {
    user.image = this.selectedFileName;
    this.userService.registerUser(user)
      .pipe(
        switchMap((data: any) => {
          this.receivedUser = data.token;
          this.done = true;
          console.log(`token: ${this.receivedUser}`);
          return this.userService.loginUser(user);
        })
      )
      .subscribe({
        next: (data: any) => {
          this.receivedUser = data.token;
          this.done = true;
          console.log(`token: ${this.receivedUser}`);
          this.storage.set('token', `${this.receivedUser}`);

          this.router.navigate(['/'])
        },
        error: (error: any) => {
          alert("Such user already exists");
          console.log(error);
        }
      });
  }
}
