import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DocService} from "../../services/doctor.service";
import {getStorageObject, removeStorageObject} from "../../utils/storage-manager";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  selectedButtonIndex : 'Inicio' | 'Usuarios'  | 'Cuestionarios' | 'Modulos' = 'Inicio';

  selectButton(index : 'Inicio' | 'Usuarios'  | 'Cuestionarios' | 'Modulos'): void {
    this.selectedButtonIndex = index;
  }

  displayedColumns: string[] = ['email', 'name', 'lastName', 'status', 'rol', 'actions'];
  dataSource = new MatTableDataSource<User>([])
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  pageSizeOptions = [1, 2, 3]


  constructor(private userService: UserService, private snackBar: MatSnackBar, private docService: DocService) {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  getUsers() {
    this.userService.isAdministrator().subscribe((data) => {
      if (data) {
        console.log("es admin")
        this.userService.list({}).subscribe((data) => {
          this.dataSource.data = data.users;
        });
      }
    });
    this.userService.isDoctor().subscribe((data) => {
      if (data) {
        console.log("es doctor")
        this.docService.getPatients(getStorageObject('email')).subscribe((data) => {
          this.dataSource.data = data;
        });
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(element: User) {
    this.userService.delete(element.email).subscribe((data) => {
      this.snackBar.open(data, 'Cerrar');
      this.getUsers();
    });
  }

  logOut() {
    removeStorageObject('access_token');
    removeStorageObject('email');
  }

  protected readonly Date = Date;
}

