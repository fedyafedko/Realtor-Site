import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Apartment} from "../models/apartment.model";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient, private storage: CookieService) { }

  getApartments(){
    return this.http.get(`http://localhost:5116/`);
  }
  getApartmentsForRealtor(){
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token')}`);
    return this.http.get(`http://localhost:5116/realtor`, { headers });
  }
  getApartmentsById(id: number){
    return this.http.get(`http://localhost:5116/${id}`);
  }
  add(apartment: Apartment) {
    const body = {
      name: apartment.name,
      images: apartment.images,
      address: apartment.address,
      city: apartment.city,
      numberRoom: apartment.numberRoom,
      square: apartment.square,
      floor: apartment.floor,
      description: apartment.description,
      price: apartment.price,
      email: apartment.email,
      phone: apartment.phone
    };
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token')}`);
    return this.http.post('http://localhost:5116/apartment', body, { headers });
  }
  deleteApartment(id: number){
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token')}`);
    return this.http.delete(`http://localhost:5116/${id}`, { headers });
  }
  update(apartment: Apartment, id: number) {
    const body = {
      name: apartment.name,
      images: apartment.images,
      address: apartment.address,
      city: apartment.city,
      numberRoom: apartment.numberRoom,
      square: apartment.square,
      floor: apartment.floor,
      description: apartment.description,
      price: apartment.price,
      email: apartment.email,
      phone: apartment.phone
    };
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.storage.get('token')}`);
    return this.http.put(`http://localhost:5116/${id}`, body, { headers });
  }
}
