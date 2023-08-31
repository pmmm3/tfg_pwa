import {Component} from '@angular/core';
import {PatientService} from "../../services/patient.service";
import {getStorageObject} from "../../utils/storage-manager";
import {Assignment} from "../../models/assignment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  assignments: Assignment[] = [];

  constructor(private patientService: PatientService) {
    this.getAssignments();
  }

  getAssignments() {
    this.patientService.getAssignments(getStorageObject('email')).subscribe((data) => {
      this.assignments = data;
    });
  }


}
