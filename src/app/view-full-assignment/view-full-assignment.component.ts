import {Component} from '@angular/core';
import {AssignmentService} from "../../services/assignment.service";
import {ActivatedRoute} from "@angular/router";
import {Assignment} from "../../models/assignment";
import {QuestionnaireService} from "../../services/questionnaire.service";
import {Module} from "../../models/module";

@Component({
    selector: 'app-view-full-assignment',
    templateUrl: './view-full-assignment.component.html',
    styleUrls: ['./view-full-assignment.component.scss']
})
export class ViewFullAssignmentComponent {
    lastModule?: Module;
    assignment?: Assignment;
    modules?: Module[];


    constructor(private assignmentService: AssignmentService, private route: ActivatedRoute, private questionnaireService: QuestionnaireService) {
        this.route.params.subscribe(params => {
            this.assignmentService.getAssignmentById(params['id']).subscribe(assignment => {
                this.assignment = assignment;

                //   Get questionnaire and modules
                this.questionnaireService.getModules(assignment.idQuestionnaire!).subscribe(modules => {
                    this.modules = modules;
                    this.lastModule = modules[modules.length - 1]
                });
            });
        });
    }


}
