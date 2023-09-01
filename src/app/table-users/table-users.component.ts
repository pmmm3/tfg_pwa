import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/user";
import {MatPaginator} from "@angular/material/paginator";
import {getStorageObject} from "../../utils/storage-manager";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DocService} from "../../services/doctor.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Assignment} from "../../models/assignment";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})
export class TableUsersComponent implements OnInit, AfterViewInit {
  @Input() rol: 'Doctor' | 'Administrador' | undefined;

  displayedColumns: string[] | undefined = undefined;
  dataSource = new MatTableDataSource<User>([])
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  pageSizeOptions = [5, 10, 15]

  expandedElement?: User;

  assignments?: Assignment[];

  constructor(private userService: UserService, private snackBar: MatSnackBar, private docService: DocService, private patientService: PatientService) {


  }

  ngOnInit() {
    switch (this.rol) {
      case 'Doctor':
        this.displayedColumns = ['email', 'name'];
        break;
      case 'Administrador':
        this.displayedColumns = ['email', 'name', 'status', 'rol', 'actions'];
        break;
      default:
        this.displayedColumns = [];
    }
    this.getUsers(this.rol);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers(role: 'Doctor' | 'Administrador' | undefined) {
    switch (role) {
      case 'Doctor':
        this.docService.getPatients(getStorageObject('email')).subscribe((data) => {
          this.dataSource.data = data;
        });
        break;
      case 'Administrador':
        this.userService.list({}).subscribe((data) => {
          this.dataSource.data = data.users;

        });
        break;
    }

  }

  deleteUser(element: User) {
    this.userService.delete(element.email).subscribe((data) => {
      this.snackBar.open(data, 'Cerrar');
      this.getUsers(this.rol);
    });
  }

  expandUser(element: User) {
    this.expandedElement = this.expandedElement === element ? undefined : element;
    this.patientService.getAssignments(element.email).subscribe((data) => {
      this.assignments = data;
    });
  }
}
