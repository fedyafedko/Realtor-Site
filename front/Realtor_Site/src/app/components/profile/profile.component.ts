import { Component, OnInit } from '@angular/core';
import { UserService } from '../request/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../request/models/user.model';
import {Router} from "@angular/router";
import { AuthenticationService } from '../request/services/authentication.service';
import {ApartmentService} from "../request/services/apartment.service";
import {Apartment} from "../request/models/apartment.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  done: boolean = false;
  showData = true;
  showApartments = false;
  apartment: Apartment[] = [];

  constructor(private userService: UserService, private apartmentService: ApartmentService, public user: User, private router: Router, private storage: CookieService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.storage.get('token');
    this.getUser();
    this.getApartments();


  }
  signOut() {
    this.storage.delete('token')
    this.router.navigate(['/']);
  }
  getUser() {
    this.userService.getUserByToken(this.storage.get('token')).subscribe({
      next: (data: any) => {
        this.user.image = `../../../assets/ImagesForUserProfile/${data.images}`;
        this.user.login = data.login;
        this.user.role = data.role;
        this.user.email = data.email;
        this.user.phone = data.phone;
        this.done = true;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  getApartments() {
    this.apartmentService.getApartmentsForRealtor().subscribe({
      next: (data: any) => {
        this.apartment = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  splitImages(image: string | undefined){
    if (image) {
      return `../../../assets/ImageForApartment/${image.split(',')[0]}`;
    }
    return [];
  }

  redirectToOtherPage(id: number | undefined, idUser: number | undefined) {
    this.router.navigate(['/apartment'], {
      queryParams: {
        id: id,
        idUser: idUser
      }
    });
  }
  showProfile() {
    this.showData = true;
    this.showApartments = false;
  }

  showMyApartments() {
    this.showData = false;
    this.showApartments = true;
  }
}
