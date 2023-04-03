import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirestoreType } from 'src/app/models/firestore_type';

@Component({
  selector: 'app-restaurant-consultes',
  templateUrl: './restaurant-consultes.component.html',
  styleUrls: ['./restaurant-consultes.component.css'],
})
export class RestaurantConsultesComponent {
  constructor(
    public dialogRef: MatDialogRef<RestaurantConsultesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<FirestoreType>
  ) {}
}
