import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoldeDTO } from '../Models/solde-dto';

@Injectable({
  providedIn: 'root'
})
export class SoldeService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  findCapitale(idTitre: string, selectedDate: Date, pourcentage: number): Observable<SoldeDTO[]> {
    const formattedDate = selectedDate.toISOString();
    return this.httpClient.get<SoldeDTO[]>(`${this.baseURL}findCapitale/${idTitre}/${formattedDate}/${pourcentage}`);
  }
}
