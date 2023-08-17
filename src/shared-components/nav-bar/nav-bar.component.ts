import {Component} from '@angular/core';
import {getStorageObject, removeStorageObject} from "../../utils/storage-manager";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  /**
   * Variable that checks if the user is logged in
   */
  isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = !!getStorageObject('access_token');
  }
  logOut() {
    removeStorageObject('access_token');
    this.isLoggedIn = false;
  }
}
