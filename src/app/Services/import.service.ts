import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Import } from '../Models/import';

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

  uploadFile(formData: any, emetteurId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload/${emetteurId}`, formData);
  }

  importFile(importData: any, emetteurId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/importfcra/${emetteurId}`, importData);
  }

  saveImportData(importData: Import, emetteurId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/importfcra/${emetteurId}`, importData);
  }

}
 