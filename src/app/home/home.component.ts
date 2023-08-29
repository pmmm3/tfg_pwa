import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalConsentimientoComponent} from "../modal-consentimiento/modal-consentimiento.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog) {
  }

  openConsentDialog() {
    this.dialog.open(ModalConsentimientoComponent, {
      maxHeight: '90vh',
      maxWidth: '75vw',
      disableClose: true,
    });
  }

  ngOnInit(): void {
    this.openConsentDialog();
  }


}
