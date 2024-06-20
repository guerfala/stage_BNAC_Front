import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeneurCompte } from '../Models/teneur-compte';

@Injectable({
  providedIn: 'root'
})
export class TeneurCompteService {
  private baseUrl = 'http://localhost:8081/bnac';

  constructor(private http: HttpClient) {}

  getAllTeneurCompte(): Observable<TeneurCompte[]> {
    return this.http.get<TeneurCompte[]>(`${this.baseUrl}/ShowAllTeneurCompte`);
  }

  addTeneurCompte(teneurCompte: TeneurCompte): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/AddTeneurCompte`, teneurCompte);
  }

  updateTeneurCompte(id: string, teneurCompte: TeneurCompte): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/UpdateTeneurCompte/${id}`, teneurCompte);
  }

  deleteTeneurCompte(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteTeneurCompte/${id}`);
  }
}
