import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private baseUrl = 'http://localhost:8081/bnac'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getEmetteurLibelleCourts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/libelleCourt`);
  }

  getTitreLibelleCourtsByEmetteurId(emetteurId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/titres/${emetteurId}`);
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
