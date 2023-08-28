import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {removeStorageObject} from "../../utils/storage-manager";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedButtonIndex: 'Inicio' | 'Usuarios' | 'Cuestionarios' | 'Modulos' = 'Inicio';

  rol: 'Doctor' | 'Administrador' | undefined;

  selectButton(index: 'Inicio' | 'Usuarios' | 'Cuestionarios' | 'Modulos'): void {
    this.selectedButtonIndex = index;
  }

  constructor(private userService: UserService) {
    this.getRol();

  }


  logOut() {
    removeStorageObject('access_token');
    removeStorageObject('email');
  }

  private getRol() {
    forkJoin([
      this.userService.isAdministrator(),
      this.userService.isDoctor()
    ]).subscribe(([isAdmin, isDoctor]) => {
      if (isAdmin) {
        this.rol = 'Administrador';
      } else if (isDoctor) {
        this.rol = 'Doctor';
      } else {
        this.rol = undefined;
      }

    });
  }

}

