import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['email', 'name', 'lastName', 'status', 'rol', 'actions'];
  dataSource = new MatTableDataSource<User>([])
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  pageSizeOptions = [1, 2, 3]


  constructor(private userService: UserService, private snackBar: MatSnackBar) {
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
}

