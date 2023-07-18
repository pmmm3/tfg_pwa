import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() okText = 'OK';
  @Input() cancelText = 'Cancelar';
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.title = data.title;
      this.message = data.message;
      this.okText = data.okText;
      this.cancelText = data.cancelText;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
