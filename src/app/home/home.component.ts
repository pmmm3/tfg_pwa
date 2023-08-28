import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  ModalConsentimientoComponent
} from "../modal-consentimiento/modal-consentimiento.component";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog, private patientService: PatientService) {
  }

  openConsentDialog() {
    this.dialog.open(ModalConsentimientoComponent, {
      maxHeight: '90vh',
      maxWidth: '75vw',
      disableClose: true,
    });
  }

  ngOnInit(): void {
    this.patientService.isConsentAccepted().subscribe(
      (data) => {
        if (!data) {
          this.openConsentDialog();
        }
      }
    )
  }


}
