
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  public login: string | undefined;
  public password: string | undefined;
  public role: string | undefined;
  public email: string | undefined;
  public phone: string | undefined;
  public image: string | undefined;
}
