import { Component } from '@angular/core';
import {Apartment} from "../request/models/apartment.model";
import {ApartmentService} from "../request/services/apartment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  constructor(private apartmentService: ApartmentService, private router: Router, public apartment: Apartment) {
  }
  receivedApartment: Apartment | undefined;
  selectedFiles: string[] = [];
  done: boolean = false;
  currency: string = "";
  price: string = "";
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = input.files;
      console.log(files);
      const fileNames: string[] = [];
      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
      this.selectedFiles = fileNames;
    }
  }
  addApartment(apartment: Apartment) {
    this.apartment.images = this.selectedFiles.join(',');
    this.apartment.price = this.price + this.currency;
    console.log(apartment);
    this.apartmentService.add(apartment)
      .subscribe({
        next: (data: any) => {
          this.receivedApartment = data;
          this.done = true;
          console.log(this.receivedApartment);
          this.router.navigate(['/profile'])
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }
}
