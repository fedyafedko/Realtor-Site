import { Injectable } from '@angular/core';
import {User} from "./user.model";

@Injectable({
  providedIn: 'root',
})
export class Apartment {
  public id: number | undefined;
  public userId: number | undefined;
  public name: string | undefined;
  public images: string | undefined;
  public address: string | undefined;
  public city: string | undefined;
  public numberRoom: number | undefined;
  public square: number | undefined;
  public floor: number | undefined;
  public description: string | undefined;
  public price: string | undefined;
  public email: string | undefined;
  public phone: string | undefined;
  public user: User | undefined;
}
