import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NatureAvoir } from '../Models/nature-avoir';

@Injectable({
  providedIn: 'root'
})
export class NatureAvoirService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getNatureAvoir(): Observable<NatureAvoir[]> {
    return this.httpClient.get<NatureAvoir[]>(`${this.baseURL}getAllNatureAvoirs`);
  }
}
