import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Titre } from '../Models/titre';

@Injectable({
  providedIn: 'root'
})
export class TitreService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getTitresByEmetteur(idEmetteur: string): Observable<Titre[]> {
    return this.httpClient.get<Titre[]>(`${this.baseURL}${idEmetteur}/titres`);
  }

  getIsinByIdTitre(id: string): Observable<string> {
    return this.httpClient.get(`${this.baseURL}getIsinByIdTitre/${id}`, { responseType: 'text' });
  }
}
