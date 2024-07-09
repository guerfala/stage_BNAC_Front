import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private baseUrl = 'http://localhost:8081/bnac'; 

  constructor(private http: HttpClient) {}

  getEmetteurLibelleCourts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/libelleCourt`);
  }

  getTitreLibelleCourtsByEmetteurId(emetteurId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/titres/${emetteurId}`);
  }

  importData(data: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/import`, data);
  } 

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
 