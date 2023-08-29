import {Component, Input, OnInit} from '@angular/core';
import {Questionnaire} from "../../models/questionnaire";

@Component({
  selector: 'app-questionnaire-card',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireCardComponent implements OnInit{
  @Input() questionnaire: Questionnaire | undefined;

  icon_color?: string;
  background_color?: string;
  text_color?: string;
  chip_text?: string;
  chip_color?: string;

  ngOnInit() {
    console.log(this.questionnaire)

    if (this.questionnaire) {
      switch (this.questionnaire.status) {
        case 'default':
          console.log('default')
          this.icon_color = '#0e7f94';
          this.background_color = 'white';
          this.text_color = '#00000087';

          break;
        case 'finished':
          console.log('finished')
          this.icon_color = 'white';
          this.background_color = '#3D3D3D';
          this.text_color = '#FFFFFF';
          this.chip_text = 'Completado';
          this.chip_color = "#000000";
          break;
        case 'draft':
          console.log('draft')
          this.icon_color = 'white';
          this.background_color = '#0e7f94';
          this.text_color = '#FFFFFF';
          this.chip_text = 'Borrador';
          this.chip_color = "#023047";
          break;
      }
    }


  }

}
