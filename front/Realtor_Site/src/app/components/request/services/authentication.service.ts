import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private storage: CookieService) {}

  isAuthenticated(): boolean {
    return !!(this.storage.get('token'));
  }
}
