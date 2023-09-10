import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApartmentService} from "../request/services/apartment.service";
import {Apartment} from "../request/models/apartment.model";
import { switchMap } from 'rxjs/operators';
import {User} from "../request/models/user.model";
import {UserService} from "../request/services/user.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit{
  constructor(private route: ActivatedRoute, private router: Router, private storage: CookieService, private apartmentService: ApartmentService, public apartment: Apartment, private userService: UserService, public user: User) {}
  currentIndex = 0;
  images: any = [];
  id: number = 0;
  idApart: number = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idApart = params['id'];
      const idUser = params['idUser'];
      this.getApartmentById(this.idApart, idUser);
      this.getUser();
    });
  }
  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? (this.images.length - 1) : (this.currentIndex - 1);
  }
  nextSlide() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : (this.currentIndex + 1);
  }
  getApartmentById(id: number, idUser: number) {
    this.apartmentService.getApartmentsById(id)
      .pipe(
        switchMap((data: any) => {
          this.apartment = data;
          this.images = this.apartment.images?.split(',').map(image => `../../../assets/ImageForApartment/${image}`)
          console.log(data);
          return this.userService.getUserById(idUser);
        })
      )
      .subscribe({
        next: (data: any) => {
          this.user.image = `../../../assets/ImagesForUserProfile/${data.images}`;
          this.user.login = data.login;
          this.user.role = data.role;
          this.user.email = data.email;
          this.user.phone = data.phone;
          console.log(data);
        },
        error: (error: any) => {
          alert("You have entered incorrect parameters");
          console.log(error);
        }
      });
  }
  getUser() {
    this.userService.getUserByToken(this.storage.get('token')).subscribe({
      next: (data: any) => {
        this.id = data.id;
        console.log(this.id);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  delete(){
    this.apartmentService.deleteApartment(this.idApart).subscribe({
      next: (data: any) => {
        this.router.navigate(['/']);
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  update(){
    this.router.navigate(['/update'], {
      queryParams: {
        id: this.idApart,
      }
    });
  }
}
