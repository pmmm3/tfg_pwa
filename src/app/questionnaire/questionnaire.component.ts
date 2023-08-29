import {Component, Input, OnInit} from '@angular/core';
import {Questionnaire} from "../../models/questionnaire";
import {QuestionnaireService} from "../../services/questionnaire.service";

@Component({
  selector: 'app-questionnaire-card',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireCardComponent implements OnInit {
  @Input() questionnaireId?: number;
  @Input() status? = 'default';

  questionnaire?: Questionnaire;

  icon_color?: string;
  background_color?: string;
  text_color?: string;
  chip_text?: string;
  chip_color?: string;

  constructor(private questionnaireService: QuestionnaireService) {
  }

  ngOnInit() {
    if (this.questionnaireId) {
      this.questionnaireService.getQuestionnaire(this.questionnaireId).subscribe((questionnaire: Questionnaire) => {
        this.questionnaire = questionnaire;
        switch (this.status) {
          case 'default':
            this.icon_color = '#0e7f94';
            this.background_color = 'white';
            this.text_color = '#00000087';

            break;
          case 'finished':
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
      })
    }

  }

}
