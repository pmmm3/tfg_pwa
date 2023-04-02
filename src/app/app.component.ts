import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {SwUpdate} from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //TODO: https://hackernoon.com/building-progressive-web-application-pwa-with-angular
  constructor(private titleService: Title, private swUpdate: SwUpdate) {
    this.titleService.setTitle('Psicosalud - Formularios psiquiátricos para diagnósticos precisos');
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if (confirm('' +
            'Hay una nueva versión disponible. ' + ' ¿Desea actualizar?')) {
            window.location.reload();
          }
        }
      )
      ;
    }
  }
}
