import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../request/services/authentication.service';
import {ApartmentService} from "../request/services/apartment.service";
import {Apartment} from "../request/models/apartment.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  apartment: Apartment[] = [];
  constructor(private apartmentService: ApartmentService, public auth: AuthenticationService, public router: Router) {
  }
  ngOnInit() {
    this.getApartments();

  }
  getApartments() {
    this.apartmentService.getApartments().subscribe({
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
}
