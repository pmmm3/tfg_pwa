import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-table-request-users',
  templateUrl: './table-request-users.component.html',
  styleUrls: ['./table-request-users.component.scss']
})
export class TableRequestUsersComponent implements AfterViewInit {

  pageSizeOptions = [5, 10, 15]
  dataSource = new MatTableDataSource<User>([])
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns: string[] = ['email', 'actions'];

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    this.getRequests();
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

  getRequests() {
    this.userService.list({filters: [{field: 'status', value: 'pending_activate'}]}).subscribe((data) => {
      this.dataSource.data = data.users;
    })
  }

  deleteRequest(email: string) {
    this.userService.delete(email).subscribe(() => {
      this.getRequests();
      this.snackBar.open('Usuario eliminado', 'Cerrar', {duration: 2000,});
    })
  }

  acceptRequest(email: string, rol: string) {
    this.userService.unlockAdminorDoctor(email, rol).subscribe(() => {
      this.getRequests();
      this.snackBar.open('Usuario aceptado', 'Cerrar', {duration: 2000,});
    })
  }


}
