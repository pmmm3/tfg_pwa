import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //TODO: https://hackernoon.com/building-progressive-web-application-pwa-with-angular
  constructor(private titleService: Title) {
    this.titleService.setTitle('Psicosalud - Formularios psiquiátricos para diagnósticos precisos');
  }
}
