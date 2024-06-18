import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NatureCompteTitre } from '../Models/nature-compte-titre';

@Injectable({
  providedIn: 'root'
})
export class NatureCompteService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getNatureCompte(): Observable<NatureCompteTitre[]> {
    return this.httpClient.get<NatureCompteTitre[]>(`${this.baseURL}getAllNatureCompteTitres`);
  }
}
