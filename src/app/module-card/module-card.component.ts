import {Component, Input} from '@angular/core';
import {Module} from "../../models/module";
import {ModuleService} from "../../services/module.service";

@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss']
})
export class ModuleCardComponent {
  @Input() module?: Module;

  constructor(private moduleService: ModuleService) {
    if (this.module) {
      this.moduleService.getModuleWithQuestions(this.module.id).subscribe((module) => {
        this.module = module;
      });

    }
  }
}
