import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent {
  email = '';

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }
  inviteUser(email: string) {
    this.userService.inviteUser(email).subscribe(
      () => {
        this.snackBar.open('Usuario invitado', 'Cerrar', {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open('Error al invitar usuario', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }
}
