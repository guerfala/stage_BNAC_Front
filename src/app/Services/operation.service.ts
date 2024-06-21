import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MouvementsDTO } from '../Models/mouvements-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getMouvements(idTitre: string, minDate: Date, maxDate: Date): Observable<MouvementsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<MouvementsDTO[]>(`${this.baseURL}ShowAllOperation/${idTitre}/${formattedminDate}/${formattedmaxDate}`);
  }
}
