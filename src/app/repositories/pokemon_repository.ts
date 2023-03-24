import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Data } from '../models/data';
@Injectable({
  providedIn: 'root',
})
export class DataRepository {
  constructor(private http: HttpClient) {}

  getData(): Observable<Data> {
    const res = this.http.get<Data>(
      'http://www.mocky.io/v2/5ea172973100002d001eeada'
    );
    return res;
  }
}
