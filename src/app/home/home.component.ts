import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  ModalConsentimientoComponent
} from "../modal-consentimiento/modal-consentimiento.component";
import {QuestionnaireService} from "../../services/questionnaire.service";
import {PatientService} from "../../services/patient.service";
import {getStorageObject} from "../../utils/storage-manager";
import {Questionnaire} from "../../models/questionnaire";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  questionnaires: Questionnaire[] = [];

  constructor(public dialog: MatDialog, private patientService: PatientService) {
    this.getQuestionnaires();
  }

  openConsentDialog() {
    this.dialog.open(ModalConsentimientoComponent, {
      maxHeight: '90vh',
      maxWidth: '75vw',
      disableClose: true,
    });
  }

  getQuestionnaires() {
    this.patientService.getAssignments(getStorageObject('email')).subscribe((data) => {
      this.questionnaires = data;
    });
  }

  ngOnInit(): void {
    // Revert to this.openConsentDialog() to show the consent dialog if the user has not accepted the terms
    this.openConsentDialog();
  }


}
