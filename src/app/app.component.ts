import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  //TODO: https://hackernoon.com/building-progressive-web-application-pwa-with-angular
  constructor(private _formBuilder: FormBuilder) {
  }
}
