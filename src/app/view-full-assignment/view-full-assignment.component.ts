import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "../../services/assignment.service";
import {ActivatedRoute} from "@angular/router";
import {Assignment} from "../../models/assignment";
import {QuestionnaireService} from "../../services/questionnaire.service";
import {PatientService} from "../../services/patient.service";
import {Module} from "../../models/module";
import {
  ModalConsentimientoComponent
} from "../modal-consentimiento/modal-consentimiento.component";
import {MatDialog} from "@angular/material/dialog";
import {getStorageObject} from "../../utils/storage-manager";
import {BaronaComponent} from "../barona/barona.component";

@Component({
  selector: 'app-view-full-assignment',
  templateUrl: './view-full-assignment.component.html',
  styleUrls: ['./view-full-assignment.component.scss']
})
export class ViewFullAssignmentComponent implements OnInit {
  lastModule?: Module;
  assignment?: Assignment;
  modules?: Module[];
  modalObservable?: any;


  constructor(private dialog: MatDialog, private assignmentService: AssignmentService, private route: ActivatedRoute, private questionnaireService: QuestionnaireService, private patientService: PatientService) {
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

  openCIBarona() {
    this.dialog.open(BaronaComponent, {
      maxHeight: '90vh',
      maxWidth: '75vw',
      disableClose: true,
    });
  }

  openConsentDialog() {
    this.modalObservable = this.dialog.open(ModalConsentimientoComponent, {
      maxHeight: '90vh',
      maxWidth: '75vw',
      disableClose: true,
    });
  }

  ngOnInit(): void {
    this.patientService.hasConsent().subscribe((data) => {
        if (!data) {
          this.openConsentDialog();
        }
        if (this.modalObservable) {
          // If the modal is closed, we check if the user has the CI Barona
          this.modalObservable.afterClosed().subscribe((data: boolean) => {

              this.patientService.hasCiBarona(getStorageObject('email')).subscribe((data) => {
                if (!data) {
                  this.openCIBarona();
                }
              });
            }
          )
          ;
        } else {
          this.patientService.hasCiBarona(getStorageObject('email')).subscribe((data) => {
            if (!data) {
              this.openCIBarona();
            }
          });
        }

      }
    );


  }


}
