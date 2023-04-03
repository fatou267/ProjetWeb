import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestaurantDetails } from 'src/app/models/details';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RestaurantDetails
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void  {
    this.dialogRef.close({result: true})
  }
}
