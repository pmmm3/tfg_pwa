import {Component} from '@angular/core';
import {AssignmentService} from "../../services/assignment.service";
import {ActivatedRoute} from "@angular/router";
import {Assignment} from "../../models/assignment";
import {PatientService} from "../../services/patient.service";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
        });
      });
    });
  }

  downloadPDF() {
    const data = document.getElementById('pdf_content')!;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(data, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${this.assignment?.id}.pdf`);
    });
  }

}
