import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentRoute: string = '';
  links = [
    {
      'label': 'Cuestionarios',
      'icon': 'assignment',
      'route': '/forms',
    },
    {
      'label': 'Cuenta',
      'icon': 'profile',
      'route': '/profile',
    }
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
}
