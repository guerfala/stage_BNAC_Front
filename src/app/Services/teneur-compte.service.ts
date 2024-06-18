import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeneurCompte } from '../Models/teneur-compte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeneurCompteService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getTC(): Observable<TeneurCompte[]> {
    return this.httpClient.get<TeneurCompte[]>(`${this.baseURL}ShowAllTeneurCompte`);
  }
}
