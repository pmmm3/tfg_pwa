import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: { id: number; name: string; }[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.dataSource.push({
        id: i,
        name: `name ${i}`
      });
    }
  }
}
