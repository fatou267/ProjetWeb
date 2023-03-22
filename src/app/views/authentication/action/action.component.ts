import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent {
  mode: string;
  constructor(private activeRoute: ActivatedRoute) {
    this.mode = this.activeRoute.snapshot.queryParams['mode'];
    console.log(this.mode);
  }
}
