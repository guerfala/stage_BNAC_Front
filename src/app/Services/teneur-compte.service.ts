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

  addTeneurCompte(teneurCompte: TeneurCompte): Observable<void> {
    return this.httpClient.post<void>(`${this.baseURL}/AddTeneurCompte`, teneurCompte);
  }

  updateTeneurCompte(id: string, teneurCompte: TeneurCompte): Observable<void> {
    return this.httpClient.put<void>(`${this.baseURL}/UpdateTeneurCompte/${id}`, teneurCompte);
  }

  deleteTeneurCompte(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/DeleteTeneurCompte/${id}`);
  }
  
  getAllTeneurCompte(): Observable<TeneurCompte[]> {
    return this.httpClient.get<TeneurCompte[]>(`${this.baseURL}/ShowAllTeneurCompte`);
  }

}
