import {Component, Input} from '@angular/core';
import {UserStatus} from "../../models/user";

@Component({
  selector: 'app-chip-user-status',
  templateUrl: './chip-user-status.component.html',
  styleUrls: ['./chip-user-status.component.scss']
})
export class ChipUserStatusComponent {
  @Input() status: UserStatus | undefined;
  protected readonly UserStatus = UserStatus;
}
