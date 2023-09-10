import {Component, OnInit} from '@angular/core';
import {Apartment} from "../request/models/apartment.model";
import {ApartmentService} from "../request/services/apartment.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-apartment',
  templateUrl: './update-apartment.component.html',
  styleUrls: ['./update-apartment.component.css']
})
export class UpdateApartmentComponent implements OnInit{
  imageSrc: string | ArrayBuffer | null = 'assets/Images/camera.png';
  images: string[] = [];
  currentIndex = 0;
  currency: string = "";
  price: string = "";
  idApart: number = 0;
  camera: boolean = true;
  imageApartment: boolean = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idApart = params['id'];
    });
  }
  constructor(private route: ActivatedRoute, private apartmentService: ApartmentService, private router: Router, public apartment: Apartment) {}
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      for (let i = 0; i < inputElement.files.length; i++) {
        const selectedFile = inputElement.files[i];
        this.images.push(`../../../assets/ImageForApartment/${selectedFile.name}`);
      }

      this.camera = false;
      this.imageApartment = true;

      console.log('Selected file names:', this.images);
    }
  }
  prevSlide() {
    console.log(this.images)
    this.currentIndex = (this.currentIndex === 0) ? (this.images.length - 1) : (this.currentIndex - 1);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : (this.currentIndex + 1);
  }
  updateApartment(apartment: Apartment) {
    this.apartment.images = this.images.join(',');
    this.apartment.price = this.price + this.currency;
    console.log(apartment);
    this.apartmentService.update(apartment, this.idApart)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/'])
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }
}
