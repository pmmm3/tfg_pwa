import {Component, Input} from '@angular/core';
import {Module} from "../../models/module";

@Component({
  selector: 'app-module-step',
  templateUrl: './module-step.component.html',
  styleUrls: ['./module-step.component.scss']
})
export class ModuleStepComponent {
  @Input() module?: Module;
}
