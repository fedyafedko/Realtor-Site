import { Component } from '@angular/core';
import {UserService} from "./components/request/services/user.service";
import {Router} from "@angular/router";
import {StorageMap} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
