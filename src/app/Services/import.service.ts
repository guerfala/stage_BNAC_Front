import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private baseUrl = 'http://localhost:8081/bnac'; 

  constructor(private httpClient: HttpClient) { }

  getEmetteursLibelleCourt(): Observable<{ libelleCourt: string }[]> {
    return this.httpClient.get<{ libelleCourt: string }[]>(`${this.baseUrl}/libelleCourt`);
  }

}
