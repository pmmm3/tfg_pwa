import {Component} from '@angular/core';
import {AssignmentService} from "../../services/assignment.service";
import {ActivatedRoute} from "@angular/router";
import {Assignment} from "../../models/assignment";
import {PatientService} from "../../services/patient.service";


@Component({
  selector: 'app-resume-assignment',
  templateUrl: './resume-assignment.component.html',
  styleUrls: ['./resume-assignment.component.scss']
})
export class ResumeAssignmentComponent {
  assignment?: Assignment;
  ciBarona?: number;
  resume?: any;
  constructor(private assignmentService: AssignmentService, route: ActivatedRoute, private patientService: PatientService) {
    route.params.subscribe(params => {
      this.assignmentService.getAssignmentById(params['id']).subscribe(assignment => {
        this.assignment = assignment;

        this.patientService.getBarona(assignment.idPatient!).subscribe(ci => {
          this.ciBarona = ci;
        });

        this.assignmentService.getAnalysis(assignment.id!).subscribe(resume => {
          this.resume = resume;
          console.log(resume)
        });
      });
    });
  }

}
