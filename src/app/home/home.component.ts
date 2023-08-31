import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  ModalConsentimientoComponent
} from "../modal-consentimiento/modal-consentimiento.component";
import {PatientService} from "../../services/patient.service";
import {getStorageObject} from "../../utils/storage-manager";
import {Assignment} from "../../models/assignment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  assignments: Assignment[] = [];

  constructor(public dialog: MatDialog, private patientService: PatientService) {
    this.getAssignments();
  }

  openConsentDialog() {
    this.dialog.open(ModalConsentimientoComponent, {
      maxHeight: '90vh',
      maxWidth: '75vw',
      disableClose: true,
    });
  }

  getAssignments() {
    this.patientService.getAssignments(getStorageObject('email')).subscribe((data) => {
      this.assignments = data;
    });
  }

  ngOnInit(): void {
    this.patientService.hasConsent().subscribe((data) => {
      if (!data) {
        this.openConsentDialog();
      }
    });
  }


}
