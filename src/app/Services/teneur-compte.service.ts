import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeneurCompte } from '../Models/teneur-compte';
import { Observable } from 'rxjs';
import { TeneurCompteDTO } from '../Models/teneur-compte-dto';

@Injectable({
  providedIn: 'root'
})
export class TeneurCompteService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getTC(): Observable<TeneurCompte[]> {
    return this.httpClient.get<TeneurCompte[]>(`${this.baseURL}ShowAllTeneurCompte`);
  }

  getAllTeneurCompteWithSolde(idTitre: string, selectedDate: Date): Observable<TeneurCompteDTO[]>{
    const formattedDate = selectedDate.toISOString();
    return this.httpClient.get<TeneurCompteDTO[]>(`${this.baseURL}ShowAllTeneurCompteWithSolde/${idTitre}/${formattedDate}`);
  }
}
